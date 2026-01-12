/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import {
  zohoInventoryApiRequest,
  zohoInventoryApiRequestAllItems,
  zohoInventoryApiRequestAllItemsWithLimit,
  prepareLineItems,
  prepareAddress,
  buildFilterQuery,
} from './transport/GenericFunctions';

import {
  itemOperations,
  itemFields,
  salesOrderOperations,
  salesOrderFields,
  purchaseOrderOperations,
  purchaseOrderFields,
  invoiceOperations,
  invoiceFields,
  contactOperations,
  contactFields,
  packageOperations,
  packageFields,
  shipmentOperations,
  shipmentFields,
  warehouseOperations,
  warehouseFields,
  transferOrderOperations,
  transferOrderFields,
  stockAdjustmentOperations,
  stockAdjustmentFields,
  compositeItemOperations,
  compositeItemFields,
  organizationOperations,
  organizationFields,
} from './descriptions';

export class ZohoInventory implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Zoho Inventory',
    name: 'zohoInventory',
    icon: 'file:zohoInventory.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Manage Zoho Inventory items, orders, contacts, and more',
    defaults: {
      name: 'Zoho Inventory',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'zohoInventoryOAuth2Api',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Composite Item', value: 'compositeItem' },
          { name: 'Contact', value: 'contact' },
          { name: 'Invoice', value: 'invoice' },
          { name: 'Item', value: 'item' },
          { name: 'Organization', value: 'organization' },
          { name: 'Package', value: 'package' },
          { name: 'Purchase Order', value: 'purchaseOrder' },
          { name: 'Sales Order', value: 'salesOrder' },
          { name: 'Shipment', value: 'shipment' },
          { name: 'Stock Adjustment', value: 'stockAdjustment' },
          { name: 'Transfer Order', value: 'transferOrder' },
          { name: 'Warehouse', value: 'warehouse' },
        ],
        default: 'item',
      },
      // Operations and fields
      ...itemOperations,
      ...itemFields,
      ...salesOrderOperations,
      ...salesOrderFields,
      ...purchaseOrderOperations,
      ...purchaseOrderFields,
      ...invoiceOperations,
      ...invoiceFields,
      ...contactOperations,
      ...contactFields,
      ...packageOperations,
      ...packageFields,
      ...shipmentOperations,
      ...shipmentFields,
      ...warehouseOperations,
      ...warehouseFields,
      ...transferOrderOperations,
      ...transferOrderFields,
      ...stockAdjustmentOperations,
      ...stockAdjustmentFields,
      ...compositeItemOperations,
      ...compositeItemFields,
      ...organizationOperations,
      ...organizationFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: IDataObject | IDataObject[] = {};

        // Item resource
        if (resource === 'item') {
          responseData = await executeItemOperation.call(this, operation, i);
        }
        // Sales Order resource
        else if (resource === 'salesOrder') {
          responseData = await executeSalesOrderOperation.call(this, operation, i);
        }
        // Purchase Order resource
        else if (resource === 'purchaseOrder') {
          responseData = await executePurchaseOrderOperation.call(this, operation, i);
        }
        // Invoice resource
        else if (resource === 'invoice') {
          responseData = await executeInvoiceOperation.call(this, operation, i);
        }
        // Contact resource
        else if (resource === 'contact') {
          responseData = await executeContactOperation.call(this, operation, i);
        }
        // Package resource
        else if (resource === 'package') {
          responseData = await executePackageOperation.call(this, operation, i);
        }
        // Shipment resource
        else if (resource === 'shipment') {
          responseData = await executeShipmentOperation.call(this, operation, i);
        }
        // Warehouse resource
        else if (resource === 'warehouse') {
          responseData = await executeWarehouseOperation.call(this, operation, i);
        }
        // Transfer Order resource
        else if (resource === 'transferOrder') {
          responseData = await executeTransferOrderOperation.call(this, operation, i);
        }
        // Stock Adjustment resource
        else if (resource === 'stockAdjustment') {
          responseData = await executeStockAdjustmentOperation.call(this, operation, i);
        }
        // Composite Item resource
        else if (resource === 'compositeItem') {
          responseData = await executeCompositeItemOperation.call(this, operation, i);
        }
        // Organization resource
        else if (resource === 'organization') {
          responseData = await executeOrganizationOperation.call(this, operation, i);
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } },
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

// Item operations
async function executeItemOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/items/${itemId}`);
    responseData = response.item as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/items', 'items', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/items', 'items', limit, {}, query);
    }
  } else if (operation === 'create') {
    const name = this.getNodeParameter('name', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = { name, ...additionalFields };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/items', body);
    responseData = response.item as IDataObject;
  } else if (operation === 'update') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/items/${itemId}`, updateFields);
    responseData = response.item as IDataObject;
  } else if (operation === 'delete') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/items/${itemId}`);
    responseData = { success: true };
  } else if (operation === 'markActive') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/items/${itemId}/active`);
    responseData = { success: true };
  } else if (operation === 'markInactive') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/items/${itemId}/inactive`);
    responseData = { success: true };
  } else if (operation === 'getInventory') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/items/${itemId}/inventory`);
    responseData = response.inventory as IDataObject;
  } else if (operation === 'updateInventory') {
    const itemId = this.getNodeParameter('itemId', i) as string;
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const quantityAvailable = this.getNodeParameter('quantityAvailable', i) as number;

    const body: IDataObject = {
      warehouses: [{ warehouse_id: warehouseId, quantity_available: quantityAvailable }],
    };

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/items/${itemId}/inventory`, body);
    responseData = response.item as IDataObject;
  }

  return responseData;
}

// Sales Order operations
async function executeSalesOrderOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/salesorders/${salesOrderId}`);
    responseData = response.salesorder as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/salesorders', 'salesorders', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/salesorders', 'salesorders', limit, {}, query);
    }
  } else if (operation === 'create') {
    const customerId = this.getNodeParameter('customerId', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      customer_id: customerId,
      line_items: prepareLineItems(lineItemsData),
      ...additionalFields,
    };

    // Handle shipping address
    if (additionalFields.shipping_address) {
      const addr = additionalFields.shipping_address as IDataObject;
      if (addr.addressFields) {
        body.shipping_address = prepareAddress(addr.addressFields as IDataObject);
        delete additionalFields.shipping_address;
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/salesorders', body);
    responseData = response.salesorder as IDataObject;
  } else if (operation === 'update') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle line items
    if (updateFields.line_items) {
      const lineItemsData = (updateFields.line_items as IDataObject).lineItemValues as IDataObject[];
      if (lineItemsData) {
        updateFields.line_items = prepareLineItems(lineItemsData);
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/salesorders/${salesOrderId}`, updateFields);
    responseData = response.salesorder as IDataObject;
  } else if (operation === 'delete') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/salesorders/${salesOrderId}`);
    responseData = { success: true };
  } else if (operation === 'confirm') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/salesorders/${salesOrderId}/status/confirmed`);
    responseData = { success: true };
  } else if (operation === 'void') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/salesorders/${salesOrderId}/status/void`);
    responseData = { success: true };
  } else if (operation === 'convertToInvoice') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'POST', `/invoices/fromsalesorder`, { salesorder_id: salesOrderId });
    responseData = response.invoice as IDataObject;
  } else if (operation === 'addComment') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const comment = this.getNodeParameter('comment', i) as string;

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/salesorders/${salesOrderId}/comments`, { description: comment });
    responseData = response.comment as IDataObject;
  } else if (operation === 'getComments') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/salesorders/${salesOrderId}/comments`);
    responseData = response.comments as IDataObject[];
  }

  return responseData;
}

// Purchase Order operations
async function executePurchaseOrderOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/purchaseorders/${purchaseOrderId}`);
    responseData = response.purchaseorder as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/purchaseorders', 'purchaseorders', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/purchaseorders', 'purchaseorders', limit, {}, query);
    }
  } else if (operation === 'create') {
    const vendorId = this.getNodeParameter('vendorId', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      vendor_id: vendorId,
      line_items: prepareLineItems(lineItemsData),
      ...additionalFields,
    };

    // Handle delivery address
    if (additionalFields.delivery_address) {
      const addr = additionalFields.delivery_address as IDataObject;
      if (addr.addressFields) {
        body.delivery_address = prepareAddress(addr.addressFields as IDataObject);
        delete additionalFields.delivery_address;
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/purchaseorders', body);
    responseData = response.purchaseorder as IDataObject;
  } else if (operation === 'update') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle line items
    if (updateFields.line_items) {
      const lineItemsData = (updateFields.line_items as IDataObject).lineItemValues as IDataObject[];
      if (lineItemsData) {
        updateFields.line_items = prepareLineItems(lineItemsData);
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/purchaseorders/${purchaseOrderId}`, updateFields);
    responseData = response.purchaseorder as IDataObject;
  } else if (operation === 'delete') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/purchaseorders/${purchaseOrderId}`);
    responseData = { success: true };
  } else if (operation === 'markAsOpen') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/purchaseorders/${purchaseOrderId}/status/open`);
    responseData = { success: true };
  } else if (operation === 'markAsBilled') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/purchaseorders/${purchaseOrderId}/status/billed`);
    responseData = { success: true };
  } else if (operation === 'cancel') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/purchaseorders/${purchaseOrderId}/status/cancelled`);
    responseData = { success: true };
  } else if (operation === 'addComment') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    const comment = this.getNodeParameter('comment', i) as string;

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/purchaseorders/${purchaseOrderId}/comments`, { description: comment });
    responseData = response.comment as IDataObject;
  } else if (operation === 'getComments') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/purchaseorders/${purchaseOrderId}/comments`);
    responseData = response.comments as IDataObject[];
  } else if (operation === 'convertToBill') {
    const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'POST', '/bills/frompurchaseorder', { purchaseorder_id: purchaseOrderId });
    responseData = response.bill as IDataObject;
  }

  return responseData;
}

// Invoice operations
async function executeInvoiceOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/invoices/${invoiceId}`);
    responseData = response.invoice as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/invoices', 'invoices', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/invoices', 'invoices', limit, {}, query);
    }
  } else if (operation === 'create') {
    const customerId = this.getNodeParameter('customerId', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      customer_id: customerId,
      line_items: prepareLineItems(lineItemsData),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/invoices', body);
    responseData = response.invoice as IDataObject;
  } else if (operation === 'update') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle line items
    if (updateFields.line_items) {
      const lineItemsData = (updateFields.line_items as IDataObject).lineItemValues as IDataObject[];
      if (lineItemsData) {
        updateFields.line_items = prepareLineItems(lineItemsData);
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/invoices/${invoiceId}`, updateFields);
    responseData = response.invoice as IDataObject;
  } else if (operation === 'delete') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/invoices/${invoiceId}`);
    responseData = { success: true };
  } else if (operation === 'markAsSent') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/invoices/${invoiceId}/status/sent`);
    responseData = { success: true };
  } else if (operation === 'markAsVoid') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/invoices/${invoiceId}/status/void`);
    responseData = { success: true };
  } else if (operation === 'sendEmail') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const emailOptions = this.getNodeParameter('emailOptions', i, {}) as IDataObject;

    const body: IDataObject = {};
    if (emailOptions.to_mail_ids) body.to_mail_ids = emailOptions.to_mail_ids;
    if (emailOptions.cc_mail_ids) body.cc_mail_ids = emailOptions.cc_mail_ids;
    if (emailOptions.subject) body.subject = emailOptions.subject;
    if (emailOptions.body) body.body = emailOptions.body;

    await zohoInventoryApiRequest.call(this, 'POST', `/invoices/${invoiceId}/email`, body);
    responseData = { success: true };
  } else if (operation === 'recordPayment') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const amount = this.getNodeParameter('amount', i) as number;
    const date = this.getNodeParameter('date', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      amount,
      date,
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/invoices/${invoiceId}/payments`, body);
    responseData = response.payment as IDataObject;
  } else if (operation === 'getPayments') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/invoices/${invoiceId}/payments`);
    responseData = response.payments as IDataObject[];
  } else if (operation === 'applyCredits') {
    const invoiceId = this.getNodeParameter('invoiceId', i) as string;
    const creditAmount = this.getNodeParameter('creditAmount', i) as number;

    const body: IDataObject = { amount: creditAmount };

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/invoices/${invoiceId}/credits`, body);
    responseData = response as IDataObject;
  }

  return responseData;
}

// Contact operations
async function executeContactOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/contacts/${contactId}`);
    responseData = response.contact as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/contacts', 'contacts', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/contacts', 'contacts', limit, {}, query);
    }
  } else if (operation === 'create') {
    const contactName = this.getNodeParameter('contactName', i) as string;
    const contactType = this.getNodeParameter('contactType', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      contact_name: contactName,
      contact_type: contactType,
      ...additionalFields,
    };

    // Handle billing address
    if (additionalFields.billing_address) {
      const addr = additionalFields.billing_address as IDataObject;
      if (addr.addressFields) {
        body.billing_address = prepareAddress(addr.addressFields as IDataObject);
        delete additionalFields.billing_address;
      }
    }

    // Handle shipping address
    if (additionalFields.shipping_address) {
      const addr = additionalFields.shipping_address as IDataObject;
      if (addr.addressFields) {
        body.shipping_address = prepareAddress(addr.addressFields as IDataObject);
        delete additionalFields.shipping_address;
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/contacts', body);
    responseData = response.contact as IDataObject;
  } else if (operation === 'update') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle billing address
    if (updateFields.billing_address) {
      const addr = updateFields.billing_address as IDataObject;
      if (addr.addressFields) {
        updateFields.billing_address = prepareAddress(addr.addressFields as IDataObject);
      }
    }

    // Handle shipping address
    if (updateFields.shipping_address) {
      const addr = updateFields.shipping_address as IDataObject;
      if (addr.addressFields) {
        updateFields.shipping_address = prepareAddress(addr.addressFields as IDataObject);
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/contacts/${contactId}`, updateFields);
    responseData = response.contact as IDataObject;
  } else if (operation === 'delete') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
    responseData = { success: true };
  } else if (operation === 'markAsActive') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/contacts/${contactId}/active`);
    responseData = { success: true };
  } else if (operation === 'markAsInactive') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/contacts/${contactId}/inactive`);
    responseData = { success: true };
  } else if (operation === 'getStatements') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/contacts/${contactId}/statements`);
    responseData = response.statements as IDataObject[];
  } else if (operation === 'sendStatement') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const emailOptions = this.getNodeParameter('emailOptions', i, {}) as IDataObject;

    const body: IDataObject = {};
    if (emailOptions.to_mail_ids) body.to_mail_ids = emailOptions.to_mail_ids;
    if (emailOptions.cc_mail_ids) body.cc_mail_ids = emailOptions.cc_mail_ids;
    if (emailOptions.subject) body.subject = emailOptions.subject;
    if (emailOptions.body) body.body = emailOptions.body;

    await zohoInventoryApiRequest.call(this, 'POST', `/contacts/${contactId}/statements/email`, body);
    responseData = { success: true };
  } else if (operation === 'getAddresses') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/contacts/${contactId}/addresses`);
    responseData = response.addresses as IDataObject[];
  } else if (operation === 'addAddress') {
    const contactId = this.getNodeParameter('contactId', i) as string;
    const addressFields = this.getNodeParameter('addressFields', i, {}) as IDataObject;

    const body = prepareAddress(addressFields);

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/contacts/${contactId}/addresses`, body);
    responseData = response.address as IDataObject;
  }

  return responseData;
}

// Package operations
async function executePackageOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const packageId = this.getNodeParameter('packageId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/packages/${packageId}`);
    responseData = response.package as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/packages', 'packages', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/packages', 'packages', limit, {}, query);
    }
  } else if (operation === 'create') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      salesorder_id: salesOrderId,
      line_items: lineItemsData.map((item) => ({
        so_line_item_id: item.so_line_item_id,
        quantity: Number(item.quantity),
      })),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/packages', body);
    responseData = response.package as IDataObject;
  } else if (operation === 'update') {
    const packageId = this.getNodeParameter('packageId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle line items
    if (updateFields.line_items) {
      const lineItemsData = (updateFields.line_items as IDataObject).lineItemValues as IDataObject[];
      if (lineItemsData) {
        updateFields.line_items = lineItemsData.map((item) => ({
          so_line_item_id: item.so_line_item_id,
          quantity: Number(item.quantity),
        }));
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/packages/${packageId}`, updateFields);
    responseData = response.package as IDataObject;
  } else if (operation === 'delete') {
    const packageId = this.getNodeParameter('packageId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/packages/${packageId}`);
    responseData = { success: true };
  } else if (operation === 'getShipments') {
    const packageId = this.getNodeParameter('packageId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/packages/${packageId}/shipments`);
    responseData = response.shipments as IDataObject[];
  }

  return responseData;
}

// Shipment operations
async function executeShipmentOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const shipmentId = this.getNodeParameter('shipmentId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/shipmentorders/${shipmentId}`);
    responseData = response.shipmentorder as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/shipmentorders', 'shipmentorders', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/shipmentorders', 'shipmentorders', limit, {}, query);
    }
  } else if (operation === 'create') {
    const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
    const packageIds = this.getNodeParameter('packageIds', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      salesorder_id: salesOrderId,
      package_ids: packageIds.split(',').map((id: string) => id.trim()),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/shipmentorders', body);
    responseData = response.shipmentorder as IDataObject;
  } else if (operation === 'update') {
    const shipmentId = this.getNodeParameter('shipmentId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/shipmentorders/${shipmentId}`, updateFields);
    responseData = response.shipmentorder as IDataObject;
  } else if (operation === 'delete') {
    const shipmentId = this.getNodeParameter('shipmentId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/shipmentorders/${shipmentId}`);
    responseData = { success: true };
  } else if (operation === 'markAsDelivered') {
    const shipmentId = this.getNodeParameter('shipmentId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/shipmentorders/${shipmentId}/status/delivered`);
    responseData = { success: true };
  } else if (operation === 'getTracking') {
    const shipmentId = this.getNodeParameter('shipmentId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/shipmentorders/${shipmentId}/tracking`);
    responseData = response.tracking as IDataObject;
  }

  return responseData;
}

// Warehouse operations
async function executeWarehouseOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/settings/warehouses/${warehouseId}`);
    responseData = response.warehouse as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/settings/warehouses', 'warehouses', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/settings/warehouses', 'warehouses', limit, {}, query);
    }
  } else if (operation === 'create') {
    const warehouseName = this.getNodeParameter('warehouseName', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      warehouse_name: warehouseName,
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/settings/warehouses', body);
    responseData = response.warehouse as IDataObject;
  } else if (operation === 'update') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/settings/warehouses/${warehouseId}`, updateFields);
    responseData = response.warehouse as IDataObject;
  } else if (operation === 'delete') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/settings/warehouses/${warehouseId}`);
    responseData = { success: true };
  } else if (operation === 'markAsActive') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/settings/warehouses/${warehouseId}/active`);
    responseData = { success: true };
  } else if (operation === 'markAsInactive') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/settings/warehouses/${warehouseId}/inactive`);
    responseData = { success: true };
  } else if (operation === 'getStock') {
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/settings/warehouses/${warehouseId}/stock`);
    responseData = response.items as IDataObject[];
  }

  return responseData;
}

// Transfer Order operations
async function executeTransferOrderOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const transferOrderId = this.getNodeParameter('transferOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/transferorders/${transferOrderId}`);
    responseData = response.transfer_order as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/transferorders', 'transfer_orders', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/transferorders', 'transfer_orders', limit, {}, query);
    }
  } else if (operation === 'create') {
    const fromWarehouseId = this.getNodeParameter('fromWarehouseId', i) as string;
    const toWarehouseId = this.getNodeParameter('toWarehouseId', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      from_warehouse_id: fromWarehouseId,
      to_warehouse_id: toWarehouseId,
      line_items: lineItemsData.map((item) => ({
        item_id: item.item_id,
        quantity_transfer: Number(item.quantity_transfer),
      })),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/transferorders', body);
    responseData = response.transfer_order as IDataObject;
  } else if (operation === 'update') {
    const transferOrderId = this.getNodeParameter('transferOrderId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle line items
    if (updateFields.line_items) {
      const lineItemsData = (updateFields.line_items as IDataObject).lineItemValues as IDataObject[];
      if (lineItemsData) {
        updateFields.line_items = lineItemsData.map((item) => ({
          item_id: item.item_id,
          quantity_transfer: Number(item.quantity_transfer),
        }));
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/transferorders/${transferOrderId}`, updateFields);
    responseData = response.transfer_order as IDataObject;
  } else if (operation === 'delete') {
    const transferOrderId = this.getNodeParameter('transferOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/transferorders/${transferOrderId}`);
    responseData = { success: true };
  } else if (operation === 'markAsReceived') {
    const transferOrderId = this.getNodeParameter('transferOrderId', i) as string;
    await zohoInventoryApiRequest.call(this, 'POST', `/transferorders/${transferOrderId}/receive`);
    responseData = { success: true };
  } else if (operation === 'getHistory') {
    const transferOrderId = this.getNodeParameter('transferOrderId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/transferorders/${transferOrderId}/history`);
    responseData = response.history as IDataObject[];
  }

  return responseData;
}

// Stock Adjustment operations
async function executeStockAdjustmentOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const inventoryAdjustmentId = this.getNodeParameter('inventoryAdjustmentId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/inventoryadjustments/${inventoryAdjustmentId}`);
    responseData = response.inventory_adjustment as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/inventoryadjustments', 'inventory_adjustments', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/inventoryadjustments', 'inventory_adjustments', limit, {}, query);
    }
  } else if (operation === 'create') {
    const adjustmentType = this.getNodeParameter('adjustmentType', i) as string;
    const date = this.getNodeParameter('date', i) as string;
    const reason = this.getNodeParameter('reason', i) as string;
    const lineItemsData = this.getNodeParameter('lineItems.lineItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      adjustment_type: adjustmentType,
      date,
      reason,
      line_items: lineItemsData.map((item) => ({
        item_id: item.item_id,
        quantity_adjusted: Number(item.quantity_adjusted),
        warehouse_id: item.warehouse_id || undefined,
        adjusted_value: item.adjusted_value ? Number(item.adjusted_value) : undefined,
      })),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/inventoryadjustments', body);
    responseData = response.inventory_adjustment as IDataObject;
  } else if (operation === 'delete') {
    const inventoryAdjustmentId = this.getNodeParameter('inventoryAdjustmentId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/inventoryadjustments/${inventoryAdjustmentId}`);
    responseData = { success: true };
  }

  return responseData;
}

// Composite Item operations
async function executeCompositeItemOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'get') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/compositeitems/${compositeItemId}`);
    responseData = response.composite_item as IDataObject;
  } else if (operation === 'getAll') {
    const returnAll = this.getNodeParameter('returnAll', i) as boolean;
    const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
    const query = buildFilterQuery(filters);

    if (returnAll) {
      responseData = await zohoInventoryApiRequestAllItems.call(this, 'GET', '/compositeitems', 'composite_items', {}, query);
    } else {
      const limit = this.getNodeParameter('limit', i) as number;
      responseData = await zohoInventoryApiRequestAllItemsWithLimit.call(this, 'GET', '/compositeitems', 'composite_items', limit, {}, query);
    }
  } else if (operation === 'create') {
    const name = this.getNodeParameter('name', i) as string;
    const mappedItemsData = this.getNodeParameter('mappedItems.mappedItemValues', i, []) as IDataObject[];
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      name,
      mapped_items: mappedItemsData.map((item) => ({
        item_id: item.item_id,
        quantity: Number(item.quantity),
        warehouse_id: item.warehouse_id || undefined,
      })),
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/compositeitems', body);
    responseData = response.composite_item as IDataObject;
  } else if (operation === 'update') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle mapped items
    if (updateFields.mapped_items) {
      const mappedItemsData = (updateFields.mapped_items as IDataObject).mappedItemValues as IDataObject[];
      if (mappedItemsData) {
        updateFields.mapped_items = mappedItemsData.map((item) => ({
          item_id: item.item_id,
          quantity: Number(item.quantity),
          warehouse_id: item.warehouse_id || undefined,
        }));
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', `/compositeitems/${compositeItemId}`, updateFields);
    responseData = response.composite_item as IDataObject;
  } else if (operation === 'delete') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    await zohoInventoryApiRequest.call(this, 'DELETE', `/compositeitems/${compositeItemId}`);
    responseData = { success: true };
  } else if (operation === 'getComponents') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/compositeitems/${compositeItemId}`);
    const compositeItem = response.composite_item as IDataObject;
    responseData = compositeItem.mapped_items as IDataObject[];
  } else if (operation === 'bundle') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    const quantityToBundle = this.getNodeParameter('quantityToBundle', i) as number;
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

    const body: IDataObject = {
      quantity_to_bundle: quantityToBundle,
      warehouse_id: warehouseId,
      ...additionalOptions,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/compositeitems/${compositeItemId}/bundle`, body);
    responseData = response.composite_item as IDataObject;
  } else if (operation === 'unbundle') {
    const compositeItemId = this.getNodeParameter('compositeItemId', i) as string;
    const quantityToUnbundle = this.getNodeParameter('quantityToUnbundle', i) as number;
    const warehouseId = this.getNodeParameter('warehouseId', i) as string;
    const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

    const body: IDataObject = {
      quantity_to_unbundle: quantityToUnbundle,
      warehouse_id: warehouseId,
      ...additionalOptions,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', `/compositeitems/${compositeItemId}/unbundle`, body);
    responseData = response.composite_item as IDataObject;
  }

  return responseData;
}

// Organization operations
async function executeOrganizationOperation(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<IDataObject | IDataObject[]> {
  let responseData: IDataObject | IDataObject[] = {};

  if (operation === 'getOrganization') {
    const response = await zohoInventoryApiRequest.call(this, 'GET', '/organizations');
    responseData = response.organizations as IDataObject[];
  } else if (operation === 'updateOrganization') {
    const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

    // Handle address
    if (updateFields.address) {
      const addr = updateFields.address as IDataObject;
      if (addr.addressFields) {
        updateFields.address = prepareAddress(addr.addressFields as IDataObject);
      }
    }

    const response = await zohoInventoryApiRequest.call(this, 'PUT', '/organizations', updateFields);
    responseData = response.organization as IDataObject;
  } else if (operation === 'getCurrencies') {
    const response = await zohoInventoryApiRequest.call(this, 'GET', '/settings/currencies');
    responseData = response.currencies as IDataObject[];
  } else if (operation === 'getTaxes') {
    const response = await zohoInventoryApiRequest.call(this, 'GET', '/settings/taxes');
    responseData = response.taxes as IDataObject[];
  } else if (operation === 'createTax') {
    const taxName = this.getNodeParameter('taxName', i) as string;
    const taxPercentage = this.getNodeParameter('taxPercentage', i) as number;
    const taxType = this.getNodeParameter('taxType', i) as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const body: IDataObject = {
      tax_name: taxName,
      tax_percentage: taxPercentage,
      tax_type: taxType,
      ...additionalFields,
    };

    const response = await zohoInventoryApiRequest.call(this, 'POST', '/settings/taxes', body);
    responseData = response.tax as IDataObject;
  } else if (operation === 'getPaymentTerms') {
    const response = await zohoInventoryApiRequest.call(this, 'GET', '/settings/paymentterms');
    responseData = response.payment_terms as IDataObject[];
  } else if (operation === 'getCustomFields') {
    const module = this.getNodeParameter('module', i) as string;
    const response = await zohoInventoryApiRequest.call(this, 'GET', `/settings/customfields?entity=${module}`);
    responseData = response.customfields as IDataObject[];
  } else if (operation === 'getPreferences') {
    const response = await zohoInventoryApiRequest.call(this, 'GET', '/settings/preferences');
    responseData = response.preferences as IDataObject;
  }

  return responseData;
}
