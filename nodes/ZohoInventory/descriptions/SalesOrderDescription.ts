/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FILTER_OPTIONS, SORT_ORDERS, DISCOUNT_TYPES } from '../constants/constants';

export const salesOrderOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['salesOrder'],
      },
    },
    options: [
      {
        name: 'Add Comment',
        value: 'addComment',
        description: 'Add a comment to a sales order',
        action: 'Add comment to sales order',
      },
      {
        name: 'Confirm',
        value: 'confirm',
        description: 'Confirm a sales order',
        action: 'Confirm a sales order',
      },
      {
        name: 'Convert to Invoice',
        value: 'convertToInvoice',
        description: 'Convert a sales order to an invoice',
        action: 'Convert sales order to invoice',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new sales order',
        action: 'Create a sales order',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a sales order',
        action: 'Delete a sales order',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a sales order by ID',
        action: 'Get a sales order',
      },
      {
        name: 'Get Comments',
        value: 'getComments',
        description: 'Get comments for a sales order',
        action: 'Get sales order comments',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many sales orders',
        action: 'Get many sales orders',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a sales order',
        action: 'Update a sales order',
      },
      {
        name: 'Void',
        value: 'void',
        description: 'Void a sales order',
        action: 'Void a sales order',
      },
    ],
    default: 'get',
  },
];

export const salesOrderFields: INodeProperties[] = [
  // ----------------------------------
  //         salesOrder: get, delete, etc.
  // ----------------------------------
  {
    displayName: 'Sales Order ID',
    name: 'salesOrderId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['get', 'delete', 'update', 'confirm', 'void', 'convertToInvoice', 'addComment', 'getComments'],
      },
    },
    description: 'The ID of the sales order',
  },

  // ----------------------------------
  //         salesOrder: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['salesOrder'],
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
        resource: ['salesOrder'],
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
        resource: ['salesOrder'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        description: 'Filter by customer ID',
      },
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: FILTER_OPTIONS.salesOrder,
        default: 'Status.All',
        description: 'Filter sales orders by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search sales orders by number or reference',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Sales Order Number', value: 'salesorder_number' },
          { name: 'Customer Name', value: 'customer_name' },
          { name: 'Date', value: 'date' },
          { name: 'Total', value: 'total' },
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
    ],
  },

  // ----------------------------------
  //         salesOrder: create
  // ----------------------------------
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['create'],
      },
    },
    description: 'The ID of the customer',
  },
  {
    displayName: 'Line Items',
    name: 'lineItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: { items: [] },
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['create'],
      },
    },
    placeholder: 'Add Line Item',
    options: [
      {
        name: 'items',
        displayName: 'Item',
        values: [
          {
            displayName: 'Item ID',
            name: 'item_id',
            type: 'string',
            default: '',
            description: 'The ID of the item',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'The quantity of the item',
          },
          {
            displayName: 'Rate',
            name: 'rate',
            type: 'number',
            default: 0,
            description: 'The rate of the item (optional, uses item rate if not specified)',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Line item description',
          },
          {
            displayName: 'Discount',
            name: 'discount',
            type: 'number',
            default: 0,
            description: 'Discount percentage on this line item',
          },
        ],
      },
    ],
    description: 'The line items for the sales order',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Adjustment',
        name: 'adjustment',
        type: 'number',
        default: 0,
        description: 'Adjustment amount (positive or negative)',
      },
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'The currency ID for the sales order',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Order date in YYYY-MM-DD format',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Discount percentage',
      },
      {
        displayName: 'Discount Type',
        name: 'discount_type',
        type: 'options',
        options: DISCOUNT_TYPES,
        default: 'entity_level',
        description: 'How discount is applied',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Customer notes',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference or PO number from customer',
      },
      {
        displayName: 'Sales Order Number',
        name: 'salesorder_number',
        type: 'string',
        default: '',
        description: 'Custom sales order number (auto-generated if not provided)',
      },
      {
        displayName: 'Shipment Date',
        name: 'shipment_date',
        type: 'string',
        default: '',
        description: 'Expected ship date in YYYY-MM-DD format',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
      {
        displayName: 'Terms',
        name: 'terms',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Terms and conditions',
      },
    ],
  },

  // ----------------------------------
  //         salesOrder: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Adjustment',
        name: 'adjustment',
        type: 'number',
        default: 0,
        description: 'Adjustment amount (positive or negative)',
      },
      {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        description: 'The ID of the customer',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Order date in YYYY-MM-DD format',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Discount percentage',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Customer notes',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference or PO number from customer',
      },
      {
        displayName: 'Shipment Date',
        name: 'shipment_date',
        type: 'string',
        default: '',
        description: 'Expected ship date in YYYY-MM-DD format',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
      {
        displayName: 'Terms',
        name: 'terms',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Terms and conditions',
      },
    ],
  },

  // ----------------------------------
  //         salesOrder: addComment
  // ----------------------------------
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    required: true,
    default: '',
    typeOptions: {
      rows: 4,
    },
    displayOptions: {
      show: {
        resource: ['salesOrder'],
        operation: ['addComment'],
      },
    },
    description: 'The comment to add',
  },
];
