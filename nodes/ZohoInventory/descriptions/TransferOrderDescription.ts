/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { SORT_ORDERS } from '../constants/constants';

export const transferOrderOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['transferOrder'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new transfer order',
        action: 'Create a transfer order',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a transfer order',
        action: 'Delete a transfer order',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a transfer order by ID',
        action: 'Get a transfer order',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many transfer orders',
        action: 'Get many transfer orders',
      },
      {
        name: 'Get History',
        value: 'getHistory',
        description: 'Get transfer order history',
        action: 'Get transfer order history',
      },
      {
        name: 'Mark as Received',
        value: 'markAsReceived',
        description: 'Mark a transfer order as received',
        action: 'Mark transfer order as received',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a transfer order',
        action: 'Update a transfer order',
      },
    ],
    default: 'get',
  },
];

export const transferOrderFields: INodeProperties[] = [
  {
    displayName: 'Transfer Order ID',
    name: 'transferOrderId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['transferOrder'],
        operation: ['get', 'delete', 'update', 'markAsReceived', 'getHistory'],
      },
    },
    description: 'The ID of the transfer order',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['transferOrder'],
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
        resource: ['transferOrder'],
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
        resource: ['transferOrder'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: [
          { name: 'All', value: 'Status.All' },
          { name: 'Draft', value: 'Status.Draft' },
          { name: 'In Transit', value: 'Status.InTransit' },
          { name: 'Received', value: 'Status.Received' },
          { name: 'Transferred', value: 'Status.Transferred' },
        ],
        default: 'Status.All',
        description: 'Filter transfer orders by status',
      },
      {
        displayName: 'From Warehouse ID',
        name: 'from_warehouse_id',
        type: 'string',
        default: '',
        description: 'Filter by source warehouse',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search transfer orders by number or reason',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Date', value: 'date' },
          { name: 'Transfer Order Number', value: 'transfer_order_number' },
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
        displayName: 'To Warehouse ID',
        name: 'to_warehouse_id',
        type: 'string',
        default: '',
        description: 'Filter by destination warehouse',
      },
    ],
  },

  // create
  {
    displayName: 'From Warehouse ID',
    name: 'fromWarehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['transferOrder'],
        operation: ['create'],
      },
    },
    description: 'The source warehouse ID',
  },
  {
    displayName: 'To Warehouse ID',
    name: 'toWarehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['transferOrder'],
        operation: ['create'],
      },
    },
    description: 'The destination warehouse ID',
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
        resource: ['transferOrder'],
        operation: ['create'],
      },
    },
    placeholder: 'Add Line Item',
    description: 'Items to transfer',
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
            description: 'The ID of the item to transfer',
          },
          {
            displayName: 'Quantity to Transfer',
            name: 'quantity_transfer',
            type: 'number',
            required: true,
            default: 1,
            description: 'Quantity to transfer',
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
        resource: ['transferOrder'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'dateTime',
        default: '',
        description: 'Transfer order date',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes for the transfer order',
      },
      {
        displayName: 'Reason',
        name: 'reason',
        type: 'string',
        default: '',
        description: 'Reason for the transfer',
      },
      {
        displayName: 'Transfer Order Number',
        name: 'transfer_order_number',
        type: 'string',
        default: '',
        description: 'Custom transfer order number',
      },
    ],
  },

  // update
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['transferOrder'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'dateTime',
        default: '',
        description: 'Transfer order date',
      },
      {
        displayName: 'From Warehouse ID',
        name: 'from_warehouse_id',
        type: 'string',
        default: '',
        description: 'Source warehouse ID',
      },
      {
        displayName: 'Line Items',
        name: 'line_items',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        placeholder: 'Add Line Item',
        description: 'Items to transfer',
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
                description: 'The ID of the item',
              },
              {
                displayName: 'Quantity to Transfer',
                name: 'quantity_transfer',
                type: 'number',
                required: true,
                default: 1,
                description: 'Quantity to transfer',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes for the transfer order',
      },
      {
        displayName: 'Reason',
        name: 'reason',
        type: 'string',
        default: '',
        description: 'Reason for the transfer',
      },
      {
        displayName: 'To Warehouse ID',
        name: 'to_warehouse_id',
        type: 'string',
        default: '',
        description: 'Destination warehouse ID',
      },
    ],
  },
];
