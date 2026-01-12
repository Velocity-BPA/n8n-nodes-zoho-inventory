/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { SORT_ORDERS } from '../constants/constants';

export const packageOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['package'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new package',
        action: 'Create a package',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a package',
        action: 'Delete a package',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a package by ID',
        action: 'Get a package',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many packages',
        action: 'Get many packages',
      },
      {
        name: 'Get Shipments',
        value: 'getShipments',
        description: 'Get shipments for a package',
        action: 'Get package shipments',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a package',
        action: 'Update a package',
      },
    ],
    default: 'get',
  },
];

export const packageFields: INodeProperties[] = [
  {
    displayName: 'Package ID',
    name: 'packageId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['package'],
        operation: ['get', 'delete', 'update', 'getShipments'],
      },
    },
    description: 'The ID of the package',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['package'],
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
        resource: ['package'],
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
        resource: ['package'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Sales Order ID',
        name: 'salesorder_id',
        type: 'string',
        default: '',
        description: 'Filter by sales order ID',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search packages by number',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Package Number', value: 'package_number' },
          { name: 'Date', value: 'date' },
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

  // create
  {
    displayName: 'Sales Order ID',
    name: 'salesOrderId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['package'],
        operation: ['create'],
      },
    },
    description: 'The ID of the associated sales order',
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
        resource: ['package'],
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
            displayName: 'SO Line Item ID',
            name: 'so_line_item_id',
            type: 'string',
            default: '',
            description: 'The line item ID from the sales order',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'The quantity to package',
          },
        ],
      },
    ],
    description: 'The line items to package',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['package'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Package date in YYYY-MM-DD format',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Package notes',
      },
      {
        displayName: 'Package Number',
        name: 'package_number',
        type: 'string',
        default: '',
        description: 'Custom package number',
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
        resource: ['package'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Package date in YYYY-MM-DD format',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Package notes',
      },
    ],
  },
];
