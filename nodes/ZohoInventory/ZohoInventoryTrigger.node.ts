/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IPollFunctions,
} from 'n8n-workflow';

import { zohoInventoryApiRequest } from './transport/GenericFunctions';

export class ZohoInventoryTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Zoho Inventory Trigger',
    name: 'zohoInventoryTrigger',
    icon: 'file:zohoInventory.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["event"]}}',
    description: 'Triggers when events occur in Zoho Inventory',
    defaults: {
      name: 'Zoho Inventory Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'zohoInventoryOAuth2Api',
        required: true,
      },
    ],
    polling: true,
    properties: [
      {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        options: [
          {
            name: 'Contact Created',
            value: 'contactCreated',
            description: 'Triggers when a contact is created',
          },
          {
            name: 'Contact Updated',
            value: 'contactUpdated',
            description: 'Triggers when a contact is updated',
          },
          {
            name: 'Invoice Created',
            value: 'invoiceCreated',
            description: 'Triggers when an invoice is created',
          },
          {
            name: 'Invoice Updated',
            value: 'invoiceUpdated',
            description: 'Triggers when an invoice is updated',
          },
          {
            name: 'Item Created',
            value: 'itemCreated',
            description: 'Triggers when an item is created',
          },
          {
            name: 'Item Updated',
            value: 'itemUpdated',
            description: 'Triggers when an item is updated',
          },
          {
            name: 'Package Created',
            value: 'packageCreated',
            description: 'Triggers when a package is created',
          },
          {
            name: 'Purchase Order Created',
            value: 'purchaseOrderCreated',
            description: 'Triggers when a purchase order is created',
          },
          {
            name: 'Purchase Order Updated',
            value: 'purchaseOrderUpdated',
            description: 'Triggers when a purchase order is updated',
          },
          {
            name: 'Sales Order Created',
            value: 'salesOrderCreated',
            description: 'Triggers when a sales order is created',
          },
          {
            name: 'Sales Order Updated',
            value: 'salesOrderUpdated',
            description: 'Triggers when a sales order is updated',
          },
          {
            name: 'Shipment Created',
            value: 'shipmentCreated',
            description: 'Triggers when a shipment is created',
          },
          {
            name: 'Stock Adjustment Created',
            value: 'stockAdjustmentCreated',
            description: 'Triggers when a stock adjustment is created',
          },
          {
            name: 'Transfer Order Created',
            value: 'transferOrderCreated',
            description: 'Triggers when a transfer order is created',
          },
        ],
        default: 'itemCreated',
        required: true,
      },
      {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        options: [
          {
            displayName: 'Limit',
            name: 'limit',
            type: 'number',
            default: 50,
            description: 'Max number of results to return per poll',
          },
        ],
      },
    ],
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    const event = this.getNodeParameter('event') as string;
    const options = this.getNodeParameter('options', {}) as IDataObject;
    const webhookData = this.getWorkflowStaticData('node');

    const limit = (options.limit as number) || 50;
    const lastModifiedTime = webhookData.lastModifiedTime as string | undefined;

    let endpoint: string;
    let propertyName: string;
    let timeField: string;

    // Map events to API endpoints and property names
    switch (event) {
      case 'itemCreated':
      case 'itemUpdated':
        endpoint = '/items';
        propertyName = 'items';
        timeField = event === 'itemCreated' ? 'created_time' : 'last_modified_time';
        break;
      case 'salesOrderCreated':
      case 'salesOrderUpdated':
        endpoint = '/salesorders';
        propertyName = 'salesorders';
        timeField = event === 'salesOrderCreated' ? 'created_time' : 'last_modified_time';
        break;
      case 'purchaseOrderCreated':
      case 'purchaseOrderUpdated':
        endpoint = '/purchaseorders';
        propertyName = 'purchaseorders';
        timeField = event === 'purchaseOrderCreated' ? 'created_time' : 'last_modified_time';
        break;
      case 'invoiceCreated':
      case 'invoiceUpdated':
        endpoint = '/invoices';
        propertyName = 'invoices';
        timeField = event === 'invoiceCreated' ? 'created_time' : 'last_modified_time';
        break;
      case 'contactCreated':
      case 'contactUpdated':
        endpoint = '/contacts';
        propertyName = 'contacts';
        timeField = event === 'contactCreated' ? 'created_time' : 'last_modified_time';
        break;
      case 'packageCreated':
        endpoint = '/packages';
        propertyName = 'packages';
        timeField = 'created_time';
        break;
      case 'shipmentCreated':
        endpoint = '/shipmentorders';
        propertyName = 'shipmentorders';
        timeField = 'created_time';
        break;
      case 'stockAdjustmentCreated':
        endpoint = '/inventoryadjustments';
        propertyName = 'inventory_adjustments';
        timeField = 'created_time';
        break;
      case 'transferOrderCreated':
        endpoint = '/transferorders';
        propertyName = 'transfer_orders';
        timeField = 'created_time';
        break;
      default:
        throw new Error(`Unknown event: ${event}`);
    }

    const query: IDataObject = {
      per_page: Math.min(limit, 200),
      sort_column: timeField,
      sort_order: 'D',
    };

    if (lastModifiedTime) {
      query.last_modified_time = lastModifiedTime;
    }

    try {
      const response = await zohoInventoryApiRequest.call(this, 'GET', endpoint, {}, query);
      const items = response[propertyName] as IDataObject[];

      if (!items || items.length === 0) {
        return null;
      }

      // Update the last modified time for the next poll
      const latestItem = items[0];
      const latestTime = latestItem[timeField] as string;

      if (latestTime) {
        webhookData.lastModifiedTime = latestTime;
      }

      // If this is the first run, don't return anything (just store the timestamp)
      if (!lastModifiedTime) {
        return null;
      }

      // Filter items to only include those created/modified after the last check
      const filteredItems = items.filter((item) => {
        const itemTime = item[timeField] as string;
        return itemTime && itemTime > lastModifiedTime;
      });

      if (filteredItems.length === 0) {
        return null;
      }

      // Limit results
      const limitedItems = filteredItems.slice(0, limit);

      return [this.helpers.returnJsonArray(limitedItems)];
    } catch (error) {
      // If there's an error, log it but don't throw (to avoid stopping the workflow)
      console.error('Zoho Inventory Trigger error:', error);
      return null;
    }
  }
}
