/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ParameterFields_create from "../ParameterFields/create.js";
import type * as ParameterFields_delete from "../ParameterFields/delete.js";
import type * as ParameterFields_read from "../ParameterFields/read.js";
import type * as ParameterFields_update from "../ParameterFields/update.js";
import type * as Schema_create from "../Schema/create.js";
import type * as Schema_delete from "../Schema/delete.js";
import type * as Schema_read from "../Schema/read.js";
import type * as Schema_update from "../Schema/update.js";
import type * as StorageRow_create from "../StorageRow/create.js";
import type * as StorageRow_delete from "../StorageRow/delete.js";
import type * as StorageRow_helper from "../StorageRow/helper.js";
import type * as StorageRow_read from "../StorageRow/read.js";
import type * as StorageRow_update from "../StorageRow/update.js";
import type * as Table_create from "../Table/create.js";
import type * as Table_delete from "../Table/delete.js";
import type * as Table_read from "../Table/read.js";
import type * as Table_update from "../Table/update.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "ParameterFields/create": typeof ParameterFields_create;
  "ParameterFields/delete": typeof ParameterFields_delete;
  "ParameterFields/read": typeof ParameterFields_read;
  "ParameterFields/update": typeof ParameterFields_update;
  "Schema/create": typeof Schema_create;
  "Schema/delete": typeof Schema_delete;
  "Schema/read": typeof Schema_read;
  "Schema/update": typeof Schema_update;
  "StorageRow/create": typeof StorageRow_create;
  "StorageRow/delete": typeof StorageRow_delete;
  "StorageRow/helper": typeof StorageRow_helper;
  "StorageRow/read": typeof StorageRow_read;
  "StorageRow/update": typeof StorageRow_update;
  "Table/create": typeof Table_create;
  "Table/delete": typeof Table_delete;
  "Table/read": typeof Table_read;
  "Table/update": typeof Table_update;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
