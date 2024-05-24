import { createSlice } from "@reduxjs/toolkit";
import {
  disableAccountUser,
  getAdminPartner,
  getAdminPartnerDetail,
  getAdminUser,
  verifyAdminCertificate,
  verifyAdminEducation,
  verifyAdminExperience,
  verifyAdminProfile,
} from "./AdminThunk";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    listUser: [],
    partner: [],
    verifyCertificate: [],
    verifyExperience: [],
    verifyEducation: [],
    partnerDetail: null,
    paging: null,
    statusCode: null,
    error: null,
    message: null,
  },
  reducers: {
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    addVerifyCertificate: (state, action) => {
      const certificate = state.verifyCertificate;
      const index = certificate.findIndex(
        (item) => item.idCertificate === action.payload.idCertificate
      );
      if (index !== -1) {
        certificate.splice(index, 1);
      }
      certificate.push(action.payload);
      state.verifyCertificate = certificate;
    },
    setVerifyCertificate: (state) => {
      state.verifyAdminCertificate = [];
    },
    addVerifyExperience: (state, action) => {
      const certificate = state.verifyExperience;
      const index = certificate.findIndex(
        (item) => item.idWorkingProcess === action.payload.idWorkingProcess
      );
      if (index !== -1) {
        certificate.splice(index, 1);
      }
      certificate.push(action.payload);
      state.verifyExperience = certificate;
    },
    setVerifyExperience: (state) => {
      state.verifyExperience = [];
    },
    addVerifyEducation: (state, action) => {
      const certificate = state.verifyEducation;
      const index = certificate.findIndex(
        (item) => item.idTrainingProcess === action.payload.idTrainingProcess
      );
      if (index !== -1) {
        certificate.splice(index, 1);
      }
      certificate.push(action.payload);
      state.verifyEducation = certificate;
    },
    setVerifyEducation: (state) => {
      state.verifyEducation = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser = action.payload.data;
        state.paging = action.payload.pagingInfo;
      })
      .addCase(getAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(disableAccountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableAccountUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
      })
      .addCase(disableAccountUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(getAdminPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partner = action.payload.data;
        state.paging = action.payload.pagingInfo;
      })
      .addCase(getAdminPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //======================================
      .addCase(getAdminPartnerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminPartnerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.partnerDetail = action.payload.data;
      })
      .addCase(getAdminPartnerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=============================
      .addCase(verifyAdminCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminCertificate.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(verifyAdminCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      ///================================
      .addCase(verifyAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(verifyAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=============================
      .addCase(verifyAdminExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminExperience.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(verifyAdminExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      })
      //=============================
      .addCase(verifyAdminEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminEducation.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode !== 200) {
          state.error = action.payload.message;
          return;
        }
        state.statusCode = action.payload.statusCode;
        state.message = action.payload.message;
      })
      .addCase(verifyAdminEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.detail;
      });
  },
});
export default adminSlice.reducer;
export const {
  setError,
  setStatusCode,
  setMessage,
  setVerifyCertificate,
  addVerifyCertificate,
  addVerifyEducation,
  setVerifyEducation,
  addVerifyExperience,
  setVerifyExperience,
} = adminSlice.actions;
