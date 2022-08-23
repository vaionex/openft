import { firebaseGetFirstNfts } from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
  isSearch: false,
  action: null,
  error: false,
  listLoading: false,
  actionsLoading: false,
  isPagination: false,
  lastAddPage: 0,
  totalCount: 0,
  entities: null,
  firstNfts: null,
  entitiesAfterFiltred: null,
  nftId: null,
  post: null,
  changeType: null,
  requestPage: 0,
  nftdocs: null,
  allnfts: null,
  allPostsData: null,
  selectedFeed: null,
}


export const fetchFirstNfts = createAsyncThunk(
  'nft/fetchFirstNfts',
  async (thunkAPI) => {
    try {
      const nfts = await firebaseGetFirstNfts()
      return nfts
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)


const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.isSearch = action.payload
    },
    setLoadingPagination: (state, action) => {
      state.isPagination = action.payload.loading
      if (action.payload.page !== null) {
        state.lastAddPage = action.payload.page
      }
    },
    getLatestNfts: (state, action) => {
      state.entities = action.payload
      state.allnfts = action.payload
      state.nftdocs = action.payload
    },
    setFetchFirstNfts: (state, action) => {
      state.firstNfts = action.payload
      state.totalCount = action.payload?.length
      state.allnfts = action.payload
      state.nftdocs = action.payload
      state.allPostsData = action.payload
    },
    setAction: (state, action) => {
      state.action = action.payload
    },
    setSelectedNft: (state, action) => {
      state.nftId = action.payload
    },
    setSelectedNftinfos: (state) => {
      state.infoPayment = null
    },
    filtredNftByTopicId: (state, action) => {
      let arr = action?.payload?.list
      state.entities = arr?.filter((el) => el.topicId === action.payload.id)
    },
    addPaginationNfts: (state, action) => {
      state.firstNfts = action.payload
      state.isPagination = false
    },
    setSelectedFeedForLike: (state, action) => {
      state.selectedFeed = action.payload
    },
    addNftDoc: (state, action) => {
      state.firstNfts.unshift(action.payload);
    },
    srotNftData: (state, action) => {
      state.firstNfts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFirstNfts.pending, (state) => {
      state.listLoading = true
    }),
      builder.addCase(fetchFirstNfts.fulfilled, (state, action) => {
        state.listLoading = false
        state.error = null
        state.firstNfts = action.payload
      }),
      builder.addCase(fetchFirstNfts.rejected, (state, action) => {
        state.listLoading = false
        state.error = true
        console.log(action.payload?.error)
      })
  }
})



export default nftSlice
export const {
  firstNfts,
  setLoadingPagination,
  setAction,
  setSelectedNft,
  filtredNftByTopicId,
  setSelectedFeedForLike,
  getLatestNfts,
  addPaginationNfts,
  addNftDoc,
  setFetchFirstNfts,
  setSearch,
  setSelectedNftinfos
} = nftSlice.actions