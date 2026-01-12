/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FILTER_OPTIONS, SORT_ORDERS } from '../constants/constants';

export const purchaseOrderOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
      },
    },
    options: [
      {
        name: 'Add Comment',
        value: 'addComment',
        description: 'Add a comment to a purchase order',
        action: 'Add comment to purchase order',
      },
      {
        name: 'Cancel',
        value: 'cancel',
        description: 'Cancel a purchase order',
        action: 'Cancel a purchase order',
      },
      {
        name: 'Convert to Bill',
        value: 'convertToBill',
        description: 'Convert a purchase order to a bill',
        action: 'Convert purchase order to bill',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new purchase order',
        action: 'Create a purchase order',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a purchase order',
        action: 'Delete a purchase order',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a purchase order by ID',
        action: 'Get a purchase order',
      },
      {
        name: 'Get Comments',
        value: 'getComments',
        description: 'Get comments for a purchase order',
        action: 'Get purchase order comments',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many purchase orders',
        action: 'Get many purchase orders',
      },
      {
        name: 'Mark as Billed',
        value: 'markAsBilled',
        description: 'Mark a purchase order as billed',
        action: 'Mark purchase order as billed',
      },
      {
        name: 'Mark as Open',
        value: 'markAsOpen',
        description: 'Mark a purchase order as open',
        action: 'Mark purchase order as open',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a purchase order',
        action: 'Update a purchase order',
      },
    ],
    default: 'get',
  },
];

export const purchaseOrderFields: INodeProperties[] = [
  // ----------------------------------
  //         purchaseOrder: get, delete, etc.
  // ----------------------------------
  {
    displayName: 'Purchase Order ID',
    name: 'purchaseOrderId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
        operation: ['get', 'delete', 'update', 'markAsOpen', 'markAsBilled', 'cancel', 'addComment', 'getComments', 'convertToBill'],
      },
    },
    description: 'The ID of the purchase order',
  },

  // ----------------------------------
  //         purchaseOrder: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
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
        resource: ['purchaseOrder'],
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
        resource: ['purchaseOrder'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: FILTER_OPTIONS.purchaseOrder,
        default: 'Status.All',
        description: 'Filter purchase orders by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search purchase orders by number or reference',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Purchase Order Number', value: 'purchaseorder_number' },
          { name: 'Vendor Name', value: 'vendor_name' },
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
      {
        displayName: 'Vendor ID',
        name: 'vendor_id',
        type: 'string',
        default: '',
        description: 'Filter by vendor ID',
      },
    ],
  },

  // ----------------------------------
  //         purchaseOrder: create
  // ----------------------------------
  {
    displayName: 'Vendor ID',
    name: 'vendorId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
        operation: ['create'],
      },
    },
    description: 'The ID of the vendor',
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
        resource: ['purchaseOrder'],
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
            description: 'The rate of the item',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Line item description',
          },
        ],
      },
    ],
    description: 'The line items for the purchase order',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'The currency ID for the purchase order',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Order date in YYYY-MM-DD format',
      },
      {
        displayName: 'Delivery Address',
        name: 'delivery_address',
        type: 'fixedCollection',
        default: {},
        options: [
          {
            name: 'address',
            displayName: 'Address',
            values: [
              { displayName: 'Address', name: 'address', type: 'string', default: '' },
              { displayName: 'City', name: 'city', type: 'string', default: '' },
              { displayName: 'State', name: 'state', type: 'string', default: '' },
              { displayName: 'Zip', name: 'zip', type: 'string', default: '' },
              { displayName: 'Country', name: 'country', type: 'string', default: '' },
            ],
          },
        ],
        description: 'Delivery address for the purchase order',
      },
      {
        displayName: 'Expected Delivery Date',
        name: 'expected_delivery_date',
        type: 'string',
        default: '',
        description: 'Expected delivery date in YYYY-MM-DD format',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes for the purchase order',
      },
      {
        displayName: 'Purchase Order Number',
        name: 'purchaseorder_number',
        type: 'string',
        default: '',
        description: 'Custom purchase order number',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference number',
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
  //         purchaseOrder: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['purchaseOrder'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Order date in YYYY-MM-DD format',
      },
      {
        displayName: 'Expected Delivery Date',
        name: 'expected_delivery_date',
        type: 'string',
        default: '',
        description: 'Expected delivery date in YYYY-MM-DD format',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes for the purchase order',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference number',
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
      {
        displayName: 'Vendor ID',
        name: 'vendor_id',
        type: 'string',
        default: '',
        description: 'The ID of the vendor',
      },
    ],
  },

  // ----------------------------------
  //         purchaseOrder: addComment
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
        resource: ['purchaseOrder'],
        operation: ['addComment'],
      },
    },
    description: 'The comment to add',
  },
];
