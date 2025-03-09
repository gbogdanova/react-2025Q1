import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../api/interface-api';

interface SelectedItemsState {
  selectedItems: Character[];
}

const initialState: SelectedItemsState = { selectedItems: [] };

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItems: (state, action: PayloadAction<Character>) => {
      const index = state.selectedItems.findIndex(
        (item) => item.url === action.payload.url
      );
      if (index != -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItems, unselectAll } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
