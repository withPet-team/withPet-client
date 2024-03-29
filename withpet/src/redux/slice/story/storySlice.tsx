import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { dbService } from 'firebase-config'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { DiaryData } from 'router/Story'

export interface CommentData {
  comment: string
  createdAt: number
  user: string
  imgUrl: string
  petName: string
  DiaryId: number
}
export interface StoryState {
  storyGroup: {
    visibility: boolean
  }
  storyData: DiaryData[] | DocumentData | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined
  commentData: CommentData[] | null
}

const initialState: StoryState = {
  storyGroup: {
    visibility: true,
  },
  storyData: [],
  status: 'idle',
  error: null,
  commentData: [],
}

const diaryCollectionRef = collection(dbService, 'diaryInfo')

export const fetchData = createAsyncThunk('diary/fetchData', async () => {
  try {
    const diarySnap = await getDocs(diaryCollectionRef)
    const data = diarySnap.docs.map((doc): DocumentData => doc.data())

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    getVisibility: (state, action) => {
      state.storyGroup.visibility = action.payload
    },
    getDiaryData: (state, action) => {
      state.storyData = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.storyData = action.payload
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { getVisibility, getDiaryData } = storySlice.actions

export default storySlice.reducer
