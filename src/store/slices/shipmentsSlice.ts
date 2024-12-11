import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Shipment, T_Part } from "../../modules/types.ts";
import { AxiosResponse } from "axios";
import { NEXT_YEAR, PREV_YEAR } from "../../utils/consts";
import { api } from "../../api";


type T_ShipmentsState = {
  draft_shipment_id: number | null;
  parts_amount: number | null;
  shipment: T_Shipment | null;
  shipments: T_Shipment[];
  filters: T_ShipmentsFilters;
  save_mm: boolean;
};

export type T_ShipmentsFilters = {
  date_formation_start: string;
  date_formation_end: string;
  status: number;
};

const initialState: T_ShipmentsState = {
  draft_shipment_id: null,
  parts_amount: null,
  shipment: null,
  shipments: [],
  filters: {
    status: 0,
    date_formation_start: PREV_YEAR.toISOString().split("T")[0],
    date_formation_end: NEXT_YEAR.toISOString().split("T")[0],
  },
  save_mm: false,
};

export const fetchShipment = createAsyncThunk<T_Shipment, string>(
  "shipments/fetchShipment",
  async (shipment_id) => {
    const response = (await api.shipments.shipmentsRead(shipment_id)) as unknown as AxiosResponse<T_Shipment>;
    console.log(shipment_id)
    return response.data;
  }
);

export const fetchShipments = createAsyncThunk<T_Shipment[], void, { state: { shipments: T_ShipmentsState } }>(
  "shipments/fetchShipments",
  async (_, { getState }) => {
    const { filters } = getState().shipments;
    const response = (await api.shipments.shipmentsSearchList ({
        status: filters.status,
        date_formation_start: filters.date_formation_start,
        date_formation_end: filters.date_formation_end,
    })) as unknown as AxiosResponse<T_Shipment[]>;
    return response.data;
  }
);

export const removePartFromDraftShipment = createAsyncThunk<T_Part[], string, { state: { shipments: T_ShipmentsState } }>(
    "shipments/removePartFromDraftShipment",
    async (part_id, { getState }) => {
      const { shipment } = getState().shipments;
  
      if (!shipment?.id) {
        throw new Error("Shipment ID is required to remove a part.");
      }
  
      const response = (await api.shipments.shipmentsDeletePartFromShipmentDelete (shipment.id, part_id)) as AxiosResponse<T_Part[]>;
      return response.data;
    }
  );
  
  export const deleteDraftShipment = createAsyncThunk<void, void, { state: { shipments: T_ShipmentsState } }>(
    "shipments/deleteDraftShipment",
    async (_, { getState }) => {
      const { shipment } = getState().shipments;
  
      if (!shipment?.id) {
        throw new Error("Shipment ID is required to delete a draft shipment.");
      }
  
      await api.shipments.shipmentsDeleteDelete(shipment.id);
    }
  );
  
export const sendDraftShipment = createAsyncThunk<
  void, 
  void, 
  { state: { shipments: T_ShipmentsState } }
>(
  "shipments/sendDraftShipment",
  async (_, { getState }) => {
    console.log("sendDraftShipment: Начало выполнения");

    const { shipment } = getState().shipments;

    console.log("sendDraftShipment: Текущее состояние shipment:", shipment);

    if (!shipment?.id) {
      console.error("sendDraftShipment: Ошибка - отсутствует ID отправки.");
      throw new Error("Shipment ID is required to send a draft shipment.");
    }

    console.log(`sendDraftShipment: Отправка ID отправки: ${shipment.id}`);

    try {
      await api.shipments.shipmentsUpdateStatusUserUpdate(shipment.id);
      console.log("sendDraftShipment: Успешно обновлен статус отправки.");
    } catch (error) {
      console.error("sendDraftShipment: Ошибка при обновлении статуса отправки:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
);

  
export const updateShipment = createAsyncThunk<void, Partial<T_Shipment>, { state: { shipments: T_ShipmentsState } }>(
  "shipments/updateShipment",
  async (data, { getState }) => {
    const { shipment } = getState().shipments;
    if (!shipment?.id) {
      throw new Error("Shipment ID is required to update a shipment.");
    }
    try {
      await api.shipments.shipmentsUpdateUpdate(shipment.id, { ...data });
    } catch (error) {
      throw error;
    }
  }
);

  
  export const updatePartValue = createAsyncThunk<void, { part_id: string; quantity: number }, { state: { shipments: T_ShipmentsState } }>(
    "shipments/updatePartValue",
    async ({ part_id, quantity }, { getState }) => {
      const { shipment } = getState().shipments;
  
      if (!shipment?.id) {
        throw new Error("Shipment ID is required to update part value.");
      }
  
      await api.shipments.shipmentsUpdatePartShipmentUpdate(shipment.id, part_id, { quantity });
    }
  );

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    saveShipment: (state, action: PayloadAction<{ draft_shipment_id: number; parts_amount: number }>) => {
      state.draft_shipment_id = action.payload.draft_shipment_id;
      state.parts_amount = action.payload.parts_amount;
    },
    removeShipment: (state) => {
      state.shipment = null;
    },
    triggerUpdateMM: (state) => {
      state.save_mm = !state.save_mm;
    },
    updateFilters: (state, action: PayloadAction<T_ShipmentsFilters>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipment.fulfilled, (state, action: PayloadAction<T_Shipment>) => {
        state.shipment = action.payload;
      })
      .addCase(fetchShipments.fulfilled, (state, action: PayloadAction<T_Shipment[]>) => {
        state.shipments = action.payload;
      })
      .addCase(removePartFromDraftShipment.fulfilled, (state, action: PayloadAction<T_Part[]>) => {
        if (state.shipment) {
          state.shipment.parts = action.payload;
        }
      })
      .addCase(sendDraftShipment.fulfilled, (state) => {
        state.shipment = null;
      });
  },
});

export const { saveShipment, removeShipment, triggerUpdateMM, updateFilters } = shipmentsSlice.actions;
export default shipmentsSlice.reducer;