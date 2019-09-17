import React from 'react';
import { IFormActions } from '@uform/types';

export default React.createContext({
  collectActions(actions: IFormActions) {},
}) as React.Context<any>;
