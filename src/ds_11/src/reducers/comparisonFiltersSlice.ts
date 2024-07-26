import { createSlice } from '@reduxjs/toolkit';

type TSstate = {
  progLang: { type: string; skill: string };
  dbms: { type: string; skill: string };
  swT: { type: string; skill: string };
  framework: { type: string; skill: string };
  paltform: { type: string; skill: string };
  tool: { type: string; skill: string };
  program: { type: string; skill: string };
};

const initialState: TSstate = {
  progLang: { type: 'Языки программирования', skill: 'Языки программирования' },
  dbms: { type: 'Базы данных', skill: 'Базы данных' },
  swT: { type: 'Типы систем', skill: 'Типы систем' },
  framework: { type: 'Фреймворки', skill: 'Фреймворки' },
  paltform: { type: 'Платформы', skill: 'Платформы' },
  tool: { type: 'Технологии', skill: 'Технологии' },
  program: { type: 'Инструменты', skill: 'Инструменты' }
};

const filtersSlice = createSlice({
  name: 'comparisonFilters',
  initialState,
  reducers: {
    setProgLang: (state, action) => {
      state.progLang.skill = action.payload;
    },
    setDbms: (state, action) => {
      state.dbms.skill = action.payload;
    },
    setSwT: (state, action) => {
      state.swT.skill = action.payload;
    },
    setFramework: (state, action) => {
      state.framework.skill = action.payload;
    },
    setPlatform: (state, action) => {
      state.paltform.skill = action.payload;
    },
    setTool: (state, action) => {
      state.tool.skill = action.payload;
    },
    setProgram: (state, action) => {
      state.program.skill = action.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;
export const { setProgLang, setDbms, setFramework, setPlatform, setProgram, setSwT, setTool } = actions;

export default reducer;
