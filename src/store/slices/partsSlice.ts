import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Part, T_PartsListResponse } from "../../modules/types.ts";
import { PARTS_MOCK } from "../../modules/mock";
import  {saveShipment}  from "./shipmentsSlice.ts";
import { api } from "../../api";
import { useSelector } from 'react-redux';
import { AxiosResponse } from "axios";
import { RootState } from "../store";

type T_PartsSlice = {
    part_name: string;
    selectedPart: null | T_Part;
    parts: T_Part[];
};

const initialState: T_PartsSlice = {
    part_name: "",
    selectedPart: null,
    parts: [],
};

export const getPartById = createAsyncThunk<T_Part, string, { state: RootState }>(
    "fetch_part",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.parts.partsRead(id);
        return response.data;
      } catch (error) {

        const mockPart = PARTS_MOCK.parts.find((part) => String(part.id) === id) as T_Part;
        if (mockPart) {
          return rejectWithValue(mockPart);
        }
        throw error;
      }
    }
  );
  

export const getPartsByName = createAsyncThunk<T_Part[], object, { state: RootState }>(
  "fetch_parts",
  async function(_, thunkAPI) {
    const state = thunkAPI.getState() as RootState;
    const response = await api.parts.partsSearchList({
      part_name: state.parts.part_name
    }) as unknown as AxiosResponse<T_PartsListResponse>;

    thunkAPI.dispatch(saveShipment({
      draft_shipment_id: response.data.draft_shipment_id,
      parts_amount: response.data.parts_amount
    }));

    return response.data.parts;
  }
);

export const addPartToShipment = createAsyncThunk<void, string, { state: RootState }>(
    "parts/add_part_to_shipment",
    async function(part_id) {
        await api.parts.partsAddToShipmentCreate(part_id);
    }
);

const partsSlice = createSlice({
    name: 'parts',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.part_name = action.payload;
        },
        removeSelectedPart: (state) => {
            state.selectedPart = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPartsByName.fulfilled, (state: T_PartsSlice, action: PayloadAction<T_Part[]>) => {
            state.parts = action.payload;
        });
        builder.addCase(getPartById.fulfilled, (state: T_PartsSlice, action: PayloadAction<T_Part>) => {
            state.selectedPart = action.payload;
        });
        builder.addCase(getPartById.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "object") {
              state.selectedPart = action.payload as T_Part;
            } else {
              state.selectedPart = null;
            }
          });
    }
});

export const useTitle = () => useSelector((state: RootState) => state.parts.part_name);

export const { setTitle, removeSelectedPart } = partsSlice.actions;

export default partsSlice.reducer;