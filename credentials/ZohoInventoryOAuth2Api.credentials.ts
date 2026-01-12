/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class ZohoInventoryOAuth2Api implements ICredentialType {
  name = 'zohoInventoryOAuth2Api';
  displayName = 'Zoho Inventory OAuth2 API';
  documentationUrl = 'https://www.zoho.com/inventory/api/v1/';
  extends = ['oAuth2Api'];

  properties: INodeProperties[] = [
    {
      displayName: 'Region',
      name: 'region',
      type: 'options',
      options: [
        { name: 'United States (zoho.com)', value: 'US' },
        { name: 'Europe (zoho.eu)', value: 'EU' },
        { name: 'India (zoho.in)', value: 'IN' },
        { name: 'Australia (zoho.com.au)', value: 'AU' },
        { name: 'Canada (zohocloud.ca)', value: 'CA' },
      ],
      default: 'US',
      description: 'The Zoho data center region for your account',
    },
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default:
        '={{$self["region"] === "EU" ? "https://accounts.zoho.eu" : $self["region"] === "IN" ? "https://accounts.zoho.in" : $self["region"] === "AU" ? "https://accounts.zoho.com.au" : $self["region"] === "CA" ? "https://accounts.zohocloud.ca" : "https://accounts.zoho.com"}}/oauth/v2/auth',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default:
        '={{$self["region"] === "EU" ? "https://accounts.zoho.eu" : $self["region"] === "IN" ? "https://accounts.zoho.in" : $self["region"] === "AU" ? "https://accounts.zoho.com.au" : $self["region"] === "CA" ? "https://accounts.zohocloud.ca" : "https://accounts.zoho.com"}}/oauth/v2/token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'ZohoInventory.fullaccess.all',
    },
    {
      displayName: 'Auth URI Query Parameters',
      name: 'authQueryParameters',
      type: 'hidden',
      default: 'access_type=offline&prompt=consent',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'body',
    },
    {
      displayName: 'Organization ID',
      name: 'organizationId',
      type: 'string',
      default: '',
      required: true,
      description:
        'The Organization ID for your Zoho Inventory account. Found in Settings → Organization Profile.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Zoho-oauthtoken {{$credentials.oauthTokenData.access_token}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL:
        '={{$credentials.region === "EU" ? "https://www.zohoapis.eu" : $credentials.region === "IN" ? "https://www.zohoapis.in" : $credentials.region === "AU" ? "https://www.zohoapis.com.au" : $credentials.region === "CA" ? "https://www.zohoapis.ca" : "https://www.zohoapis.com"}}',
      url: '=/inventory/v1/organizations',
    },
  };
}
