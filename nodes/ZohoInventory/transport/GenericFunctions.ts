/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  ILoadOptionsFunctions,
  INode,
  IPollFunctions,
  IRequestOptions,
  IWebhookFunctions,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { ZOHO_API_URLS, API_VERSION, DEFAULT_PAGE_SIZE, LICENSING_NOTICE } from '../constants/constants';
import type { ZohoRegion, ZohoApiResponse, ZohoPageContext } from '../types/ZohoInventoryTypes';

// Log licensing notice once on module load
let licensingNoticeLogged = false;

function logLicensingNotice(): void {
  if (!licensingNoticeLogged) {
    console.warn(LICENSING_NOTICE);
    licensingNoticeLogged = true;
  }
}

/**
 * Get the API base URL for a given region
 */
export function getApiUrl(region: ZohoRegion): string {
  return ZOHO_API_URLS[region] || ZOHO_API_URLS.US;
}

/**
 * Make an API request to Zoho Inventory
 */
export async function zohoInventoryApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions | IPollFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<ZohoApiResponse> {
  logLicensingNotice();

  const credentials = await this.getCredentials('zohoInventoryOAuth2Api');
  const region = (credentials.region as ZohoRegion) || 'US';
  const baseUrl = getApiUrl(region);

  // Always include organization_id
  query.organization_id = credentials.organizationId as string;

  const options: IRequestOptions = {
    method,
    uri: `${baseUrl}/inventory/${API_VERSION}${endpoint}`,
    qs: query,
    json: true,
  };

  if (Object.keys(body).length > 0) {
    if (method === 'GET') {
      options.qs = { ...options.qs, ...body };
    } else {
      options.body = body;
    }
  }

  try {
    const response = await this.helpers.requestOAuth2.call(
      this,
      'zohoInventoryOAuth2Api',
      options,
      { tokenType: 'Zoho-oauthtoken' },
    );

    // Check for Zoho API errors
    if (response.code !== undefined && response.code !== 0) {
      throw new NodeApiError(this.getNode(), response as JsonObject, {
        message: response.message || 'Unknown Zoho API error',
      });
    }

    return response as ZohoApiResponse;
  } catch (error) {
    if (error instanceof NodeApiError) {
      throw error;
    }

    const errorData = error as { response?: { body?: JsonObject }; message?: string };
    throw new NodeApiError(this.getNode(), errorData.response?.body || { message: errorData.message } as JsonObject, {
      message: `Zoho Inventory API Error: ${errorData.message || 'Unknown error'}`,
    });
  }
}

/**
 * Make a paginated API request to get all items
 */
export async function zohoInventoryApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  propertyName: string,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  let hasMorePages = true;

  query.per_page = DEFAULT_PAGE_SIZE;

  while (hasMorePages) {
    query.page = page;

    const response = await zohoInventoryApiRequest.call(this, method, endpoint, body, query);

    const items = response[propertyName];

    if (Array.isArray(items)) {
      returnData.push(...(items as IDataObject[]));

      const pageContext = response.page_context as ZohoPageContext | undefined;
      hasMorePages = pageContext?.has_more_page === true;
    } else {
      hasMorePages = false;
    }

    page++;
  }

  return returnData;
}

/**
 * Make a paginated API request with a limit
 */
export async function zohoInventoryApiRequestAllItemsWithLimit(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  propertyName: string,
  limit: number,
  body: IDataObject = {},
  query: IDataObject = {},
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  let hasMorePages = true;

  query.per_page = Math.min(limit, DEFAULT_PAGE_SIZE);

  while (hasMorePages && returnData.length < limit) {
    query.page = page;

    const response = await zohoInventoryApiRequest.call(this, method, endpoint, body, query);

    const items = response[propertyName];

    if (Array.isArray(items)) {
      const remaining = limit - returnData.length;
      const itemsToAdd = items.slice(0, remaining);
      returnData.push(...(itemsToAdd as IDataObject[]));

      const pageContext = response.page_context as ZohoPageContext | undefined;
      hasMorePages = pageContext?.has_more_page === true && returnData.length < limit;
    } else {
      hasMorePages = false;
    }

    page++;
  }

  return returnData;
}

/**
 * Convert line items from n8n format to Zoho API format
 */
export function prepareLineItems(lineItems: IDataObject[]): IDataObject[] {
  return lineItems.map((item) => {
    const lineItem: IDataObject = {};

    if (item.item_id) lineItem.item_id = item.item_id;
    if (item.name) lineItem.name = item.name;
    if (item.description) lineItem.description = item.description;
    if (item.quantity !== undefined) lineItem.quantity = Number(item.quantity);
    if (item.rate !== undefined) lineItem.rate = Number(item.rate);
    if (item.unit) lineItem.unit = item.unit;
    if (item.tax_id) lineItem.tax_id = item.tax_id;
    if (item.discount !== undefined) lineItem.discount = Number(item.discount);

    return lineItem;
  });
}

/**
 * Prepare address object
 */
export function prepareAddress(address: IDataObject): IDataObject {
  const preparedAddress: IDataObject = {};

  const fields = ['address', 'street2', 'city', 'state', 'zip', 'country', 'phone', 'fax', 'attention'];
  
  for (const field of fields) {
    if (address[field]) {
      preparedAddress[field] = address[field];
    }
  }

  return preparedAddress;
}

/**
 * Build filter query from options
 */
export function buildFilterQuery(options: IDataObject): IDataObject {
  const query: IDataObject = {};

  if (options.filter_by) query.filter_by = options.filter_by;
  if (options.search_text) query.search_text = options.search_text;
  if (options.sort_column) query.sort_column = options.sort_column;
  if (options.sort_order) query.sort_order = options.sort_order;
  if (options.last_modified_time) query.last_modified_time = options.last_modified_time;

  return query;
}

/**
 * Simplify response data by extracting the main entity
 */
export function simplifyResponse(response: ZohoApiResponse, entityKey: string): IDataObject {
  if (response[entityKey]) {
    return response[entityKey] as IDataObject;
  }
  return response as unknown as IDataObject;
}

/**
 * Handle Zoho API errors with meaningful messages
 */
export function handleZohoError(error: unknown, node: INode): never {
  const errorData = error as { code?: number; message?: string; response?: { body?: JsonObject } };
  
  let message = 'Unknown Zoho API error';
  
  if (errorData.message) {
    message = errorData.message;
  } else if (errorData.response?.body) {
    const body = errorData.response.body;
    if (typeof body === 'object' && 'message' in body) {
      message = String(body.message);
    }
  }

  throw new NodeApiError(node, errorData as JsonObject, { message });
}
