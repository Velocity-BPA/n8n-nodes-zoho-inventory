/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { ITEM_TYPES, PRODUCT_TYPES, FILTER_OPTIONS, SORT_ORDERS } from '../constants/constants';

export const itemOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['item'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new item',
        action: 'Create an item',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an item',
        action: 'Delete an item',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve an item by ID',
        action: 'Get an item',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many items',
        action: 'Get many items',
      },
      {
        name: 'Get Inventory',
        value: 'getInventory',
        description: 'Get inventory levels for an item',
        action: 'Get item inventory',
      },
      {
        name: 'Mark Active',
        value: 'markActive',
        description: 'Activate an item',
        action: 'Mark item as active',
      },
      {
        name: 'Mark Inactive',
        value: 'markInactive',
        description: 'Deactivate an item',
        action: 'Mark item as inactive',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an item',
        action: 'Update an item',
      },
      {
        name: 'Update Inventory',
        value: 'updateInventory',
        description: 'Update stock levels for an item',
        action: 'Update item inventory',
      },
    ],
    default: 'get',
  },
];

export const itemFields: INodeProperties[] = [
  // ----------------------------------
  //         item: get
  // ----------------------------------
  {
    displayName: 'Item ID',
    name: 'itemId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['get', 'delete', 'update', 'markActive', 'markInactive', 'getInventory', 'updateInventory'],
      },
    },
    description: 'The ID of the item',
  },

  // ----------------------------------
  //         item: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: FILTER_OPTIONS.item,
        default: 'Status.All',
        description: 'Filter items by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search items by name, SKU, or description',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Name', value: 'name' },
          { name: 'SKU', value: 'sku' },
          { name: 'Rate', value: 'rate' },
          { name: 'Created Time', value: 'created_time' },
          { name: 'Last Modified Time', value: 'last_modified_time' },
        ],
        default: 'name',
        description: 'Column to sort by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: SORT_ORDERS,
        default: 'A',
        description: 'Sort order (ascending or descending)',
      },
    ],
  },

  // ----------------------------------
  //         item: create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['create'],
      },
    },
    description: 'The name of the item',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Brand',
        name: 'brand',
        type: 'string',
        default: '',
        description: 'The brand of the item',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'The description of the item',
      },
      {
        displayName: 'EAN',
        name: 'ean',
        type: 'string',
        default: '',
        description: 'The EAN code of the item',
      },
      {
        displayName: 'Initial Stock',
        name: 'initial_stock',
        type: 'number',
        default: 0,
        description: 'The opening stock of the item',
      },
      {
        displayName: 'Initial Stock Rate',
        name: 'initial_stock_rate',
        type: 'number',
        default: 0,
        description: 'The opening stock value per unit',
      },
      {
        displayName: 'ISBN',
        name: 'isbn',
        type: 'string',
        default: '',
        description: 'The ISBN of the item',
      },
      {
        displayName: 'Item Type',
        name: 'item_type',
        type: 'options',
        options: ITEM_TYPES,
        default: 'inventory',
        description: 'The type of the item',
      },
      {
        displayName: 'Manufacturer',
        name: 'manufacturer',
        type: 'string',
        default: '',
        description: 'The manufacturer of the item',
      },
      {
        displayName: 'Part Number',
        name: 'part_number',
        type: 'string',
        default: '',
        description: 'The part number of the item',
      },
      {
        displayName: 'Product Type',
        name: 'product_type',
        type: 'options',
        options: PRODUCT_TYPES,
        default: 'goods',
        description: 'Whether this is a good or a service',
      },
      {
        displayName: 'Purchase Rate',
        name: 'purchase_rate',
        type: 'number',
        default: 0,
        description: 'The purchase price of the item',
      },
      {
        displayName: 'Rate',
        name: 'rate',
        type: 'number',
        default: 0,
        description: 'The selling price of the item',
      },
      {
        displayName: 'Reorder Level',
        name: 'reorder_level',
        type: 'number',
        default: 0,
        description: 'The reorder point for the item',
      },
      {
        displayName: 'SKU',
        name: 'sku',
        type: 'string',
        default: '',
        description: 'The Stock Keeping Unit code',
      },
      {
        displayName: 'Tax ID',
        name: 'tax_id',
        type: 'string',
        default: '',
        description: 'The ID of the tax rate to apply',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'The unit of measure (e.g., pcs, kg, box)',
      },
      {
        displayName: 'UPC',
        name: 'upc',
        type: 'string',
        default: '',
        description: 'The Universal Product Code',
      },
      {
        displayName: 'Vendor ID',
        name: 'vendor_id',
        type: 'string',
        default: '',
        description: 'The ID of the preferred vendor',
      },
    ],
  },

  // ----------------------------------
  //         item: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Brand',
        name: 'brand',
        type: 'string',
        default: '',
        description: 'The brand of the item',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'The description of the item',
      },
      {
        displayName: 'EAN',
        name: 'ean',
        type: 'string',
        default: '',
        description: 'The EAN code of the item',
      },
      {
        displayName: 'ISBN',
        name: 'isbn',
        type: 'string',
        default: '',
        description: 'The ISBN of the item',
      },
      {
        displayName: 'Item Type',
        name: 'item_type',
        type: 'options',
        options: ITEM_TYPES,
        default: 'inventory',
        description: 'The type of the item',
      },
      {
        displayName: 'Manufacturer',
        name: 'manufacturer',
        type: 'string',
        default: '',
        description: 'The manufacturer of the item',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the item',
      },
      {
        displayName: 'Part Number',
        name: 'part_number',
        type: 'string',
        default: '',
        description: 'The part number of the item',
      },
      {
        displayName: 'Product Type',
        name: 'product_type',
        type: 'options',
        options: PRODUCT_TYPES,
        default: 'goods',
        description: 'Whether this is a good or a service',
      },
      {
        displayName: 'Purchase Rate',
        name: 'purchase_rate',
        type: 'number',
        default: 0,
        description: 'The purchase price of the item',
      },
      {
        displayName: 'Rate',
        name: 'rate',
        type: 'number',
        default: 0,
        description: 'The selling price of the item',
      },
      {
        displayName: 'Reorder Level',
        name: 'reorder_level',
        type: 'number',
        default: 0,
        description: 'The reorder point for the item',
      },
      {
        displayName: 'SKU',
        name: 'sku',
        type: 'string',
        default: '',
        description: 'The Stock Keeping Unit code',
      },
      {
        displayName: 'Tax ID',
        name: 'tax_id',
        type: 'string',
        default: '',
        description: 'The ID of the tax rate to apply',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'The unit of measure (e.g., pcs, kg, box)',
      },
      {
        displayName: 'UPC',
        name: 'upc',
        type: 'string',
        default: '',
        description: 'The Universal Product Code',
      },
      {
        displayName: 'Vendor ID',
        name: 'vendor_id',
        type: 'string',
        default: '',
        description: 'The ID of the preferred vendor',
      },
    ],
  },

  // ----------------------------------
  //         item: updateInventory
  // ----------------------------------
  {
    displayName: 'Warehouse ID',
    name: 'warehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['updateInventory'],
      },
    },
    description: 'The ID of the warehouse',
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['item'],
        operation: ['updateInventory'],
      },
    },
    description: 'The new stock quantity',
  },
];
