/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { CONTACT_TYPES, CUSTOMER_SUB_TYPES, FILTER_OPTIONS, SORT_ORDERS } from '../constants/constants';

export const contactOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['contact'],
      },
    },
    options: [
      {
        name: 'Add Address',
        value: 'addAddress',
        description: 'Add an address to a contact',
        action: 'Add address to contact',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new contact',
        action: 'Create a contact',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a contact',
        action: 'Delete a contact',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a contact by ID',
        action: 'Get a contact',
      },
      {
        name: 'Get Addresses',
        value: 'getAddresses',
        description: 'Get addresses for a contact',
        action: 'Get contact addresses',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many contacts',
        action: 'Get many contacts',
      },
      {
        name: 'Get Statements',
        value: 'getStatements',
        description: 'Get account statements for a contact',
        action: 'Get contact statements',
      },
      {
        name: 'Mark as Active',
        value: 'markAsActive',
        description: 'Activate a contact',
        action: 'Mark contact as active',
      },
      {
        name: 'Mark as Inactive',
        value: 'markAsInactive',
        description: 'Deactivate a contact',
        action: 'Mark contact as inactive',
      },
      {
        name: 'Send Statement',
        value: 'sendStatement',
        description: 'Email statement to a contact',
        action: 'Send contact statement',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a contact',
        action: 'Update a contact',
      },
    ],
    default: 'get',
  },
];

export const contactFields: INodeProperties[] = [
  // ----------------------------------
  //         contact: get, delete, etc.
  // ----------------------------------
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['get', 'delete', 'update', 'markAsActive', 'markAsInactive', 'getStatements', 'sendStatement', 'getAddresses', 'addAddress'],
      },
    },
    description: 'The ID of the contact',
  },

  // ----------------------------------
  //         contact: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['contact'],
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
        resource: ['contact'],
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
        resource: ['contact'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Contact Type',
        name: 'contact_type',
        type: 'options',
        options: CONTACT_TYPES,
        default: 'customer',
        description: 'Filter by contact type',
      },
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: FILTER_OPTIONS.contact,
        default: 'Status.All',
        description: 'Filter contacts by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search contacts by name or email',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Contact Name', value: 'contact_name' },
          { name: 'Company Name', value: 'company_name' },
          { name: 'Email', value: 'email' },
          { name: 'Created Time', value: 'created_time' },
        ],
        default: 'contact_name',
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
  //         contact: create
  // ----------------------------------
  {
    displayName: 'Contact Name',
    name: 'contactName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'The name of the contact or company',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Billing Address',
        name: 'billing_address',
        type: 'fixedCollection',
        default: {},
        options: [
          {
            name: 'address',
            displayName: 'Address',
            values: [
              { displayName: 'Address', name: 'address', type: 'string', default: '' },
              { displayName: 'Street 2', name: 'street2', type: 'string', default: '' },
              { displayName: 'City', name: 'city', type: 'string', default: '' },
              { displayName: 'State', name: 'state', type: 'string', default: '' },
              { displayName: 'Zip', name: 'zip', type: 'string', default: '' },
              { displayName: 'Country', name: 'country', type: 'string', default: '' },
              { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
              { displayName: 'Fax', name: 'fax', type: 'string', default: '' },
            ],
          },
        ],
        description: 'Billing address for the contact',
      },
      {
        displayName: 'Company Name',
        name: 'company_name',
        type: 'string',
        default: '',
        description: 'The company name',
      },
      {
        displayName: 'Contact Persons',
        name: 'contact_persons',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: { persons: [] },
        options: [
          {
            name: 'persons',
            displayName: 'Person',
            values: [
              { displayName: 'First Name', name: 'first_name', type: 'string', default: '' },
              { displayName: 'Last Name', name: 'last_name', type: 'string', default: '' },
              { displayName: 'Email', name: 'email', type: 'string', default: '' },
              { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
              { displayName: 'Mobile', name: 'mobile', type: 'string', default: '' },
              { displayName: 'Is Primary Contact', name: 'is_primary_contact', type: 'boolean', default: false },
            ],
          },
        ],
        description: 'Contact persons for this contact',
      },
      {
        displayName: 'Contact Type',
        name: 'contact_type',
        type: 'options',
        options: CONTACT_TYPES,
        default: 'customer',
        description: 'Whether this is a customer or vendor',
      },
      {
        displayName: 'Credit Limit',
        name: 'credit_limit',
        type: 'number',
        default: 0,
        description: 'Credit limit for the contact',
      },
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'Default currency for the contact',
      },
      {
        displayName: 'Customer Sub Type',
        name: 'customer_sub_type',
        type: 'options',
        options: CUSTOMER_SUB_TYPES,
        default: 'business',
        description: 'Whether this is a business or individual',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Primary email address',
      },
      {
        displayName: 'GST Number',
        name: 'gst_no',
        type: 'string',
        default: '',
        description: 'GST/Tax identification number',
      },
      {
        displayName: 'Payment Terms',
        name: 'payment_terms',
        type: 'number',
        default: 0,
        description: 'Payment terms in days',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number',
      },
      {
        displayName: 'Shipping Address',
        name: 'shipping_address',
        type: 'fixedCollection',
        default: {},
        options: [
          {
            name: 'address',
            displayName: 'Address',
            values: [
              { displayName: 'Address', name: 'address', type: 'string', default: '' },
              { displayName: 'Street 2', name: 'street2', type: 'string', default: '' },
              { displayName: 'City', name: 'city', type: 'string', default: '' },
              { displayName: 'State', name: 'state', type: 'string', default: '' },
              { displayName: 'Zip', name: 'zip', type: 'string', default: '' },
              { displayName: 'Country', name: 'country', type: 'string', default: '' },
              { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
              { displayName: 'Fax', name: 'fax', type: 'string', default: '' },
            ],
          },
        ],
        description: 'Shipping address for the contact',
      },
    ],
  },

  // ----------------------------------
  //         contact: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Company Name',
        name: 'company_name',
        type: 'string',
        default: '',
        description: 'The company name',
      },
      {
        displayName: 'Contact Name',
        name: 'contact_name',
        type: 'string',
        default: '',
        description: 'The name of the contact',
      },
      {
        displayName: 'Credit Limit',
        name: 'credit_limit',
        type: 'number',
        default: 0,
        description: 'Credit limit for the contact',
      },
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'Default currency for the contact',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Primary email address',
      },
      {
        displayName: 'GST Number',
        name: 'gst_no',
        type: 'string',
        default: '',
        description: 'GST/Tax identification number',
      },
      {
        displayName: 'Payment Terms',
        name: 'payment_terms',
        type: 'number',
        default: 0,
        description: 'Payment terms in days',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number',
      },
    ],
  },

  // ----------------------------------
  //         contact: addAddress
  // ----------------------------------
  {
    displayName: 'Address',
    name: 'address',
    type: 'fixedCollection',
    required: true,
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['addAddress'],
      },
    },
    options: [
      {
        name: 'addressDetails',
        displayName: 'Address Details',
        values: [
          { displayName: 'Address', name: 'address', type: 'string', default: '', required: true },
          { displayName: 'Street 2', name: 'street2', type: 'string', default: '' },
          { displayName: 'City', name: 'city', type: 'string', default: '' },
          { displayName: 'State', name: 'state', type: 'string', default: '' },
          { displayName: 'Zip', name: 'zip', type: 'string', default: '' },
          { displayName: 'Country', name: 'country', type: 'string', default: '' },
          { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
          { displayName: 'Fax', name: 'fax', type: 'string', default: '' },
          { displayName: 'Attention', name: 'attention', type: 'string', default: '' },
        ],
      },
    ],
    description: 'The address to add',
  },

  // ----------------------------------
  //         contact: sendStatement
  // ----------------------------------
  {
    displayName: 'Email Options',
    name: 'emailOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['sendStatement'],
      },
    },
    options: [
      {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        typeOptions: {
          rows: 6,
        },
        default: '',
        description: 'Email body content',
      },
      {
        displayName: 'CC Emails',
        name: 'cc_mail_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated CC email addresses',
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        description: 'Email subject line',
      },
      {
        displayName: 'To Emails',
        name: 'to_mail_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated recipient email addresses',
      },
    ],
  },
];
