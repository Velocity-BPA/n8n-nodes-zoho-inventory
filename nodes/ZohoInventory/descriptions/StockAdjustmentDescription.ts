/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { SORT_ORDERS } from '../constants/constants';

export const stockAdjustmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new stock adjustment',
        action: 'Create a stock adjustment',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a stock adjustment',
        action: 'Delete a stock adjustment',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a stock adjustment by ID',
        action: 'Get a stock adjustment',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many stock adjustments',
        action: 'Get many stock adjustments',
      },
    ],
    default: 'get',
  },
];

export const stockAdjustmentFields: INodeProperties[] = [
  {
    displayName: 'Inventory Adjustment ID',
    name: 'inventoryAdjustmentId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['get', 'delete'],
      },
    },
    description: 'The ID of the stock adjustment',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
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
        resource: ['stockAdjustment'],
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
        resource: ['stockAdjustment'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Adjustment Type',
        name: 'adjustment_type',
        type: 'options',
        options: [
          { name: 'Quantity', value: 'quantity' },
          { name: 'Value', value: 'value' },
        ],
        default: 'quantity',
        description: 'Filter by adjustment type',
      },
      {
        displayName: 'Item ID',
        name: 'item_id',
        type: 'string',
        default: '',
        description: 'Filter by item ID',
      },
      {
        displayName: 'Reason',
        name: 'reason',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Stock on Fire', value: 'stock_on_fire' },
          { name: 'Damaged Goods', value: 'damaged_goods' },
          { name: 'Stock Written Off', value: 'stock_written_off' },
          { name: 'Inventory Revaluation', value: 'inventory_revaluation' },
          { name: 'Others', value: 'others' },
        ],
        default: '',
        description: 'Filter by adjustment reason',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search adjustments by description',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Date', value: 'date' },
          { name: 'Adjustment Number', value: 'adjustment_number' },
          { name: 'Created Time', value: 'created_time' },
        ],
        default: 'date',
        description: 'Column to sort by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: SORT_ORDERS,
        default: 'D',
        description: 'Sort order (ascending or descending)',
      },
      {
        displayName: 'Warehouse ID',
        name: 'warehouse_id',
        type: 'string',
        default: '',
        description: 'Filter by warehouse',
      },
    ],
  },

  // create
  {
    displayName: 'Adjustment Type',
    name: 'adjustmentType',
    type: 'options',
    options: [
      { name: 'Quantity', value: 'quantity' },
      { name: 'Value', value: 'value' },
    ],
    required: true,
    default: 'quantity',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    description: 'Type of adjustment (quantity or value)',
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    description: 'Date of the adjustment',
  },
  {
    displayName: 'Reason',
    name: 'reason',
    type: 'options',
    options: [
      { name: 'Stock on Fire', value: 'stock_on_fire' },
      { name: 'Damaged Goods', value: 'damaged_goods' },
      { name: 'Stock Written Off', value: 'stock_written_off' },
      { name: 'Inventory Revaluation', value: 'inventory_revaluation' },
      { name: 'Others', value: 'others' },
    ],
    required: true,
    default: 'others',
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    description: 'Reason for the adjustment',
  },
  {
    displayName: 'Line Items',
    name: 'lineItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: {},
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    placeholder: 'Add Line Item',
    description: 'Items to adjust',
    options: [
      {
        name: 'lineItemValues',
        displayName: 'Line Item',
        values: [
          {
            displayName: 'Item ID',
            name: 'item_id',
            type: 'string',
            required: true,
            default: '',
            description: 'The ID of the item to adjust',
          },
          {
            displayName: 'Quantity Adjusted',
            name: 'quantity_adjusted',
            type: 'number',
            required: true,
            default: 0,
            description: 'Quantity to adjust (positive for increase, negative for decrease)',
          },
          {
            displayName: 'Warehouse ID',
            name: 'warehouse_id',
            type: 'string',
            default: '',
            description: 'Warehouse ID for the adjustment',
          },
          {
            displayName: 'Adjusted Value',
            name: 'adjusted_value',
            type: 'number',
            default: 0,
            description: 'Value adjustment (for value-type adjustments)',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['stockAdjustment'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Account ID',
        name: 'account_id',
        type: 'string',
        default: '',
        description: 'Account ID for the adjustment',
      },
      {
        displayName: 'Adjustment Number',
        name: 'adjustment_number',
        type: 'string',
        default: '',
        description: 'Custom adjustment number',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Description of the adjustment',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference number',
      },
    ],
  },
];
