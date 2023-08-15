import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from './root-state.type';

type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export type { AppThunk };
