import { IFormActions } from '@uform/types';
export default function checkDirtyCreator(all: Array<IFormActions>): [() => boolean, (e: any) => any];
