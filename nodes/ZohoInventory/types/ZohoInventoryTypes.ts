/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export type ZohoRegion = 'US' | 'EU' | 'IN' | 'AU' | 'CA';

export interface ZohoCredentials {
  region: ZohoRegion;
  organizationId: string;
  oauthTokenData: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };
}

export interface ZohoApiResponse {
  code: number;
  message: string;
  [key: string]: unknown;
}

export interface ZohoPageContext {
  page: number;
  per_page: number;
  has_more_page: boolean;
  applied_filter?: string;
  sort_column?: string;
  sort_order?: string;
}

export interface ZohoPaginatedResponse extends ZohoApiResponse {
  page_context: ZohoPageContext;
}

// Item Types
export interface ZohoItem extends IDataObject {
  item_id: string;
  name: string;
  sku?: string;
  unit?: string;
  item_type?: 'inventory' | 'sales' | 'purchases' | 'sales_and_purchases';
  product_type?: 'goods' | 'service';
  description?: string;
  rate?: number;
  purchase_rate?: number;
  initial_stock?: number;
  initial_stock_rate?: number;
  reorder_level?: number;
  vendor_id?: string;
  tax_id?: string;
  brand?: string;
  manufacturer?: string;
  upc?: string;
  ean?: string;
  isbn?: string;
  part_number?: string;
  status?: 'active' | 'inactive';
}

// Sales Order Types
export interface ZohoSalesOrder extends IDataObject {
  salesorder_id: string;
  salesorder_number: string;
  customer_id: string;
  date: string;
  status?: 'draft' | 'confirmed' | 'closed' | 'void';
  shipment_date?: string;
  reference_number?: string;
  line_items: ZohoLineItem[];
  shipping_charge?: number;
  adjustment?: number;
  discount?: number;
  discount_type?: 'entity_level' | 'item_level';
  notes?: string;
  terms?: string;
  currency_id?: string;
}

// Purchase Order Types
export interface ZohoPurchaseOrder extends IDataObject {
  purchaseorder_id: string;
  purchaseorder_number: string;
  vendor_id: string;
  date: string;
  status?: 'draft' | 'open' | 'billed' | 'cancelled';
  expected_delivery_date?: string;
  reference_number?: string;
  line_items: ZohoLineItem[];
  delivery_address?: ZohoAddress;
  notes?: string;
  terms?: string;
  currency_id?: string;
}

// Invoice Types
export interface ZohoInvoice extends IDataObject {
  invoice_id: string;
  invoice_number: string;
  customer_id: string;
  date: string;
  status?: 'draft' | 'sent' | 'overdue' | 'paid' | 'void';
  due_date?: string;
  salesorder_id?: string;
  line_items: ZohoLineItem[];
  payment_terms?: number;
  payment_terms_label?: string;
  discount?: number;
  shipping_charge?: number;
  adjustment?: number;
  notes?: string;
}

// Contact Types
export interface ZohoContact extends IDataObject {
  contact_id: string;
  contact_name: string;
  contact_type?: 'customer' | 'vendor';
  customer_sub_type?: 'business' | 'individual';
  company_name?: string;
  email?: string;
  phone?: string;
  currency_id?: string;
  payment_terms?: number;
  billing_address?: ZohoAddress;
  shipping_address?: ZohoAddress;
  credit_limit?: number;
  gst_no?: string;
  contact_persons?: ZohoContactPerson[];
}

export interface ZohoContactPerson extends IDataObject {
  contact_person_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  is_primary_contact?: boolean;
}

// Package Types
export interface ZohoPackage extends IDataObject {
  package_id: string;
  package_number: string;
  salesorder_id: string;
  date: string;
  line_items: ZohoPackageLineItem[];
  notes?: string;
}

export interface ZohoPackageLineItem extends IDataObject {
  line_item_id?: string;
  so_line_item_id?: string;
  item_id?: string;
  name?: string;
  quantity?: number;
}

// Shipment Types
export interface ZohoShipment extends IDataObject {
  shipment_id: string;
  shipment_number: string;
  salesorder_id: string;
  package_ids: string[];
  date: string;
  delivery_method?: string;
  tracking_number?: string;
  shipping_charge?: number;
  delivery_date?: string;
  notes?: string;
}

// Warehouse Types
export interface ZohoWarehouse extends IDataObject {
  warehouse_id: string;
  warehouse_name: string;
  address?: ZohoAddress;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  phone?: string;
  email?: string;
  is_primary?: boolean;
  status?: 'active' | 'inactive';
}

// Transfer Order Types
export interface ZohoTransferOrder extends IDataObject {
  transfer_order_id: string;
  transfer_order_number: string;
  date: string;
  status?: 'draft' | 'in_transit' | 'received';
  from_warehouse_id: string;
  to_warehouse_id: string;
  line_items: ZohoTransferLineItem[];
  reason?: string;
  notes?: string;
}

export interface ZohoTransferLineItem extends IDataObject {
  line_item_id?: string;
  item_id?: string;
  name?: string;
  quantity_transfer?: number;
}

// Stock Adjustment Types
export interface ZohoStockAdjustment extends IDataObject {
  inventory_adjustment_id: string;
  adjustment_number: string;
  date: string;
  reason?: string;
  adjustment_type?: 'quantity' | 'value';
  warehouse_id?: string;
  line_items: ZohoAdjustmentLineItem[];
  description?: string;
}

export interface ZohoAdjustmentLineItem extends IDataObject {
  line_item_id?: string;
  item_id?: string;
  name?: string;
  quantity_adjusted?: number;
  adjustment_type?: 'add' | 'reduce';
}

// Composite Item Types
export interface ZohoCompositeItem extends IDataObject {
  composite_item_id: string;
  name: string;
  sku?: string;
  unit?: string;
  mapped_items: ZohoMappedItem[];
  purchase_rate?: number;
  rate?: number;
  description?: string;
}

export interface ZohoMappedItem extends IDataObject {
  item_id: string;
  name?: string;
  quantity: number;
}

// Common Types
export interface ZohoLineItem extends IDataObject {
  line_item_id?: string;
  item_id?: string;
  name?: string;
  description?: string;
  quantity?: number;
  rate?: number;
  unit?: string;
  tax_id?: string;
  discount?: number;
}

export interface ZohoAddress extends IDataObject {
  address?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  fax?: string;
  attention?: string;
}

// Organization Types
export interface ZohoOrganization extends IDataObject {
  organization_id: string;
  name: string;
  currency_id?: string;
  currency_code?: string;
  time_zone?: string;
  date_format?: string;
  fiscal_year_start_month?: number;
}

// Webhook Types
export interface ZohoWebhookPayload extends IDataObject {
  event_type: string;
  event_time: string;
  organization_id: string;
  resource_id: string;
  resource_name: string;
  data: IDataObject;
}

// Resource and Operation Types
export type ZohoResource =
  | 'item'
  | 'salesOrder'
  | 'purchaseOrder'
  | 'invoice'
  | 'contact'
  | 'package'
  | 'shipment'
  | 'warehouse'
  | 'transferOrder'
  | 'stockAdjustment'
  | 'compositeItem'
  | 'organization';

export type ItemOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markActive'
  | 'markInactive'
  | 'getInventory'
  | 'updateInventory'
  | 'getImage'
  | 'uploadImage';

export type SalesOrderOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'confirm'
  | 'void'
  | 'convertToInvoice'
  | 'addComment'
  | 'getComments'
  | 'getAttachments'
  | 'addAttachment';

export type PurchaseOrderOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsOpen'
  | 'markAsBilled'
  | 'cancel'
  | 'addComment'
  | 'getComments'
  | 'convertToBill';

export type InvoiceOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsSent'
  | 'markAsVoid'
  | 'sendEmail'
  | 'recordPayment'
  | 'getPayments'
  | 'applyCredits';

export type ContactOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsActive'
  | 'markAsInactive'
  | 'getStatements'
  | 'sendStatement'
  | 'getAddresses'
  | 'addAddress';

export type PackageOperation = 'get' | 'getAll' | 'create' | 'update' | 'delete' | 'getShipments';

export type ShipmentOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsDelivered'
  | 'getTracking';

export type WarehouseOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsActive'
  | 'markAsInactive'
  | 'getStock';

export type TransferOrderOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'markAsReceived'
  | 'getHistory';

export type StockAdjustmentOperation = 'get' | 'getAll' | 'create' | 'delete';

export type CompositeItemOperation =
  | 'get'
  | 'getAll'
  | 'create'
  | 'update'
  | 'delete'
  | 'getComponents'
  | 'bundle'
  | 'unbundle';

export type OrganizationOperation =
  | 'getOrganization'
  | 'updateOrganization'
  | 'getCurrencies'
  | 'getTaxes'
  | 'createTax'
  | 'getPaymentTerms'
  | 'getCustomFields'
  | 'getPreferences';
