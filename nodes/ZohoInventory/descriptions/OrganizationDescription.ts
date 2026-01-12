/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['organization'],
      },
    },
    options: [
      {
        name: 'Create Tax',
        value: 'createTax',
        description: 'Create a new tax rate',
        action: 'Create a tax rate',
      },
      {
        name: 'Get Currencies',
        value: 'getCurrencies',
        description: 'Get available currencies',
        action: 'Get currencies',
      },
      {
        name: 'Get Custom Fields',
        value: 'getCustomFields',
        description: 'Get custom fields for a module',
        action: 'Get custom fields',
      },
      {
        name: 'Get Organization',
        value: 'getOrganization',
        description: 'Get organization details',
        action: 'Get organization',
      },
      {
        name: 'Get Payment Terms',
        value: 'getPaymentTerms',
        description: 'Get payment terms',
        action: 'Get payment terms',
      },
      {
        name: 'Get Preferences',
        value: 'getPreferences',
        description: 'Get organization preferences',
        action: 'Get preferences',
      },
      {
        name: 'Get Taxes',
        value: 'getTaxes',
        description: 'Get tax rates',
        action: 'Get tax rates',
      },
      {
        name: 'Update Organization',
        value: 'updateOrganization',
        description: 'Update organization details',
        action: 'Update organization',
      },
    ],
    default: 'getOrganization',
  },
];

export const organizationFields: INodeProperties[] = [
  // getCustomFields
  {
    displayName: 'Module',
    name: 'module',
    type: 'options',
    options: [
      { name: 'Contact', value: 'contact' },
      { name: 'Invoice', value: 'invoice' },
      { name: 'Item', value: 'item' },
      { name: 'Package', value: 'package' },
      { name: 'Purchase Order', value: 'purchaseorder' },
      { name: 'Sales Order', value: 'salesorder' },
      { name: 'Shipment', value: 'shipment' },
    ],
    required: true,
    default: 'item',
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['getCustomFields'],
      },
    },
    description: 'Module to get custom fields for',
  },

  // createTax
  {
    displayName: 'Tax Name',
    name: 'taxName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['createTax'],
      },
    },
    description: 'Name of the tax rate',
  },
  {
    displayName: 'Tax Percentage',
    name: 'taxPercentage',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['createTax'],
      },
    },
    description: 'Tax percentage',
  },
  {
    displayName: 'Tax Type',
    name: 'taxType',
    type: 'options',
    options: [
      { name: 'Tax', value: 'tax' },
      { name: 'Compound Tax', value: 'compound_tax' },
    ],
    required: true,
    default: 'tax',
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['createTax'],
      },
    },
    description: 'Type of tax',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['createTax'],
      },
    },
    options: [
      {
        displayName: 'Country Code',
        name: 'country_code',
        type: 'string',
        default: '',
        description: 'Country code for the tax',
      },
      {
        displayName: 'Is Default Tax',
        name: 'is_default_tax',
        type: 'boolean',
        default: false,
        description: 'Whether this is the default tax',
      },
      {
        displayName: 'Is Editable',
        name: 'is_editable',
        type: 'boolean',
        default: true,
        description: 'Whether the tax is editable',
      },
      {
        displayName: 'Tax Authority ID',
        name: 'tax_authority_id',
        type: 'string',
        default: '',
        description: 'Tax authority ID',
      },
    ],
  },

  // updateOrganization
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['organization'],
        operation: ['updateOrganization'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'fixedCollection',
        default: {},
        placeholder: 'Add Address',
        options: [
          {
            name: 'addressFields',
            displayName: 'Address',
            values: [
              {
                displayName: 'Attention',
                name: 'attention',
                type: 'string',
                default: '',
                description: 'Attention line',
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
                displayName: 'State',
                name: 'state',
                type: 'string',
                default: '',
                description: 'State',
              },
              {
                displayName: 'Street Address 1',
                name: 'street_address1',
                type: 'string',
                default: '',
                description: 'Street address line 1',
              },
              {
                displayName: 'Street Address 2',
                name: 'street_address2',
                type: 'string',
                default: '',
                description: 'Street address line 2',
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
        ],
      },
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'Default currency ID',
      },
      {
        displayName: 'Date Format',
        name: 'date_format',
        type: 'options',
        options: [
          { name: 'dd MMM yyyy', value: 'dd MMM yyyy' },
          { name: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
          { name: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
          { name: 'MM-dd-yyyy', value: 'MM-dd-yyyy' },
          { name: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
          { name: 'yyyy-MM-dd', value: 'yyyy-MM-dd' },
        ],
        default: 'dd MMM yyyy',
        description: 'Date format',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Organization email',
      },
      {
        displayName: 'Fax',
        name: 'fax',
        type: 'string',
        default: '',
        description: 'Fax number',
      },
      {
        displayName: 'Fiscal Year Start Month',
        name: 'fiscal_year_start_month',
        type: 'options',
        options: [
          { name: 'January', value: 0 },
          { name: 'February', value: 1 },
          { name: 'March', value: 2 },
          { name: 'April', value: 3 },
          { name: 'May', value: 4 },
          { name: 'June', value: 5 },
          { name: 'July', value: 6 },
          { name: 'August', value: 7 },
          { name: 'September', value: 8 },
          { name: 'October', value: 9 },
          { name: 'November', value: 10 },
          { name: 'December', value: 11 },
        ],
        default: 0,
        description: 'Fiscal year start month',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Organization name',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Phone number',
      },
      {
        displayName: 'Time Zone',
        name: 'time_zone',
        type: 'string',
        default: '',
        description: 'Timezone (e.g., America/New_York)',
      },
      {
        displayName: 'Website',
        name: 'website',
        type: 'string',
        default: '',
        description: 'Website URL',
      },
    ],
  },
];
