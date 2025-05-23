/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as LibraryBookIdImport } from './routes/library.$bookId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LibraryBookIdRoute = LibraryBookIdImport.update({
  id: '/library/$bookId',
  path: '/library/$bookId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/library/$bookId': {
      id: '/library/$bookId'
      path: '/library/$bookId'
      fullPath: '/library/$bookId'
      preLoaderRoute: typeof LibraryBookIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/library/$bookId': typeof LibraryBookIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/library/$bookId': typeof LibraryBookIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/library/$bookId': typeof LibraryBookIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/library/$bookId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/library/$bookId'
  id: '__root__' | '/' | '/library/$bookId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LibraryBookIdRoute: typeof LibraryBookIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LibraryBookIdRoute: LibraryBookIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/library/$bookId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/library/$bookId": {
      "filePath": "library.$bookId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
