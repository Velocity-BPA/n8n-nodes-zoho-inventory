/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { ZohoRegion } from '../types/ZohoInventoryTypes';

export const ZOHO_API_URLS: Record<ZohoRegion, string> = {
  US: 'https://www.zohoapis.com',
  EU: 'https://www.zohoapis.eu',
  IN: 'https://www.zohoapis.in',
  AU: 'https://www.zohoapis.com.au',
  CA: 'https://www.zohoapis.ca',
};

export const ZOHO_ACCOUNTS_URLS: Record<ZohoRegion, string> = {
  US: 'https://accounts.zoho.com',
  EU: 'https://accounts.zoho.eu',
  IN: 'https://accounts.zoho.in',
  AU: 'https://accounts.zoho.com.au',
  CA: 'https://accounts.zohocloud.ca',
};

export const API_VERSION = 'v1';
export const DEFAULT_PAGE_SIZE = 200;
export const MAX_PAGE_SIZE = 200;

export const ITEM_TYPES = [
  { name: 'Inventory', value: 'inventory' },
  { name: 'Sales', value: 'sales' },
  { name: 'Purchases', value: 'purchases' },
  { name: 'Sales and Purchases', value: 'sales_and_purchases' },
];

export const PRODUCT_TYPES = [
  { name: 'Goods', value: 'goods' },
  { name: 'Service', value: 'service' },
];

export const SALES_ORDER_STATUSES = [
  { name: 'Draft', value: 'draft' },
  { name: 'Confirmed', value: 'confirmed' },
  { name: 'Closed', value: 'closed' },
  { name: 'Void', value: 'void' },
];

export const PURCHASE_ORDER_STATUSES = [
  { name: 'Draft', value: 'draft' },
  { name: 'Open', value: 'open' },
  { name: 'Billed', value: 'billed' },
  { name: 'Cancelled', value: 'cancelled' },
];

export const INVOICE_STATUSES = [
  { name: 'Draft', value: 'draft' },
  { name: 'Sent', value: 'sent' },
  { name: 'Overdue', value: 'overdue' },
  { name: 'Paid', value: 'paid' },
  { name: 'Void', value: 'void' },
];

export const CONTACT_TYPES = [
  { name: 'Customer', value: 'customer' },
  { name: 'Vendor', value: 'vendor' },
];

export const CUSTOMER_SUB_TYPES = [
  { name: 'Business', value: 'business' },
  { name: 'Individual', value: 'individual' },
];

export const DISCOUNT_TYPES = [
  { name: 'Entity Level', value: 'entity_level' },
  { name: 'Item Level', value: 'item_level' },
];

export const TRANSFER_ORDER_STATUSES = [
  { name: 'Draft', value: 'draft' },
  { name: 'In Transit', value: 'in_transit' },
  { name: 'Received', value: 'received' },
];

export const ADJUSTMENT_TYPES = [
  { name: 'Quantity', value: 'quantity' },
  { name: 'Value', value: 'value' },
];

export const WAREHOUSE_STATUSES = [
  { name: 'Active', value: 'active' },
  { name: 'Inactive', value: 'inactive' },
];

export const SORT_ORDERS = [
  { name: 'Ascending', value: 'A' },
  { name: 'Descending', value: 'D' },
];

export const FILTER_OPTIONS = {
  item: [
    { name: 'All', value: 'Status.All' },
    { name: 'Active', value: 'Status.Active' },
    { name: 'Inactive', value: 'Status.Inactive' },
  ],
  salesOrder: [
    { name: 'All', value: 'Status.All' },
    { name: 'Draft', value: 'Status.Draft' },
    { name: 'Confirmed', value: 'Status.Confirmed' },
    { name: 'Closed', value: 'Status.Closed' },
    { name: 'Void', value: 'Status.Void' },
  ],
  purchaseOrder: [
    { name: 'All', value: 'Status.All' },
    { name: 'Draft', value: 'Status.Draft' },
    { name: 'Open', value: 'Status.Open' },
    { name: 'Billed', value: 'Status.Billed' },
    { name: 'Cancelled', value: 'Status.Cancelled' },
  ],
  invoice: [
    { name: 'All', value: 'Status.All' },
    { name: 'Draft', value: 'Status.Draft' },
    { name: 'Sent', value: 'Status.Sent' },
    { name: 'Overdue', value: 'Status.Overdue' },
    { name: 'Paid', value: 'Status.Paid' },
    { name: 'Void', value: 'Status.Void' },
  ],
  contact: [
    { name: 'All', value: 'Status.All' },
    { name: 'Active', value: 'Status.Active' },
    { name: 'Inactive', value: 'Status.Inactive' },
    { name: 'Customers', value: 'contact_type.customer' },
    { name: 'Vendors', value: 'contact_type.vendor' },
  ],
};

export const WEBHOOK_EVENTS = [
  'item.created',
  'item.updated',
  'item.deleted',
  'salesorder.created',
  'salesorder.confirmed',
  'salesorder.closed',
  'purchaseorder.created',
  'purchaseorder.billed',
  'invoice.created',
  'invoice.paid',
  'shipment.created',
  'shipment.delivered',
  'package.created',
  'contact.created',
  'contact.updated',
  'inventory.adjusted',
];

export const ERROR_CODES: Record<number, string> = {
  0: 'Success',
  1: 'Internal error',
  2: 'Bad request',
  14: 'Invalid value',
  36: 'Resource not found',
  44: 'Rate limit exceeded',
  57: 'Authentication failed',
};

export const LICENSING_NOTICE = `[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`;
