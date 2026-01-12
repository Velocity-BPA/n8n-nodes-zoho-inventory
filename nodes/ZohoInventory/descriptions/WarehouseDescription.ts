/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { WAREHOUSE_STATUSES, SORT_ORDERS } from '../constants/constants';

export const warehouseOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['warehouse'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new warehouse',
        action: 'Create a warehouse',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a warehouse',
        action: 'Delete a warehouse',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a warehouse by ID',
        action: 'Get a warehouse',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many warehouses',
        action: 'Get many warehouses',
      },
      {
        name: 'Get Stock',
        value: 'getStock',
        description: 'Get stock levels for a warehouse',
        action: 'Get warehouse stock',
      },
      {
        name: 'Mark as Active',
        value: 'markAsActive',
        description: 'Activate a warehouse',
        action: 'Mark warehouse as active',
      },
      {
        name: 'Mark as Inactive',
        value: 'markAsInactive',
        description: 'Deactivate a warehouse',
        action: 'Mark warehouse as inactive',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a warehouse',
        action: 'Update a warehouse',
      },
    ],
    default: 'get',
  },
];

export const warehouseFields: INodeProperties[] = [
  {
    displayName: 'Warehouse ID',
    name: 'warehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['warehouse'],
        operation: ['get', 'delete', 'update', 'markAsActive', 'markAsInactive', 'getStock'],
      },
    },
    description: 'The ID of the warehouse',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['warehouse'],
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
        resource: ['warehouse'],
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
        resource: ['warehouse'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search warehouses by name',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Warehouse Name', value: 'warehouse_name' },
          { name: 'City', value: 'city' },
          { name: 'Created Time', value: 'created_time' },
        ],
        default: 'warehouse_name',
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
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: WAREHOUSE_STATUSES,
        default: 'active',
        description: 'Filter by status',
      },
    ],
  },

  // create
  {
    displayName: 'Warehouse Name',
    name: 'warehouseName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['warehouse'],
        operation: ['create'],
      },
    },
    description: 'The name of the warehouse',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['warehouse'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: 'Street address',
      },
      {
        displayName: 'City',
        name: 'city',
        type: 'string',
        default: '',
        description: 'City',
      },
      {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: '',
        description: 'Country',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Contact email',
      },
      {
        displayName: 'Is Primary',
        name: 'is_primary',
        type: 'boolean',
        default: false,
        description: 'Whether this is the primary warehouse',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Contact phone number',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'string',
        default: '',
        description: 'State or province',
      },
      {
        displayName: 'Zip',
        name: 'zip',
        type: 'string',
        default: '',
        description: 'Postal code',
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
        resource: ['warehouse'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: 'Street address',
      },
      {
        displayName: 'City',
        name: 'city',
        type: 'string',
        default: '',
        description: 'City',
      },
      {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: '',
        description: 'Country',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Contact email',
      },
      {
        displayName: 'Is Primary',
        name: 'is_primary',
        type: 'boolean',
        default: false,
        description: 'Whether this is the primary warehouse',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Contact phone number',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'string',
        default: '',
        description: 'State or province',
      },
      {
        displayName: 'Warehouse Name',
        name: 'warehouse_name',
        type: 'string',
        default: '',
        description: 'The name of the warehouse',
      },
      {
        displayName: 'Zip',
        name: 'zip',
        type: 'string',
        default: '',
        description: 'Postal code',
      },
    ],
  },
];
