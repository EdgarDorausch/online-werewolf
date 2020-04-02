# ./src/redux

This directory contains all code required to work with redux.
The folder structure is the following:

* index.ts - combines the several sub-states und reducers
* configureStore.ts - contains a store factory
* \<SubStoreFolders> - are containing the logic of an "local"/independent part of the store. Each folder has this folder structure:
    * types.ts
    * reducer.ts
    * actions.ts

This approach is fully inspired by this article: https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e
