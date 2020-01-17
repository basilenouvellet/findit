import React from 'react';
import { styled, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { sendMessageToContentScript } from './utils/chrome';

import theme from './theme.js';

const AppContainer = styled(Box)({
  height: '30em',
  width: '60em',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const ToolBar = styled(Toolbar)({
  justifyContent: 'center',
});

const AppGridContainer = styled(Grid)({
  flexGrow: 1,
  padding: '2em 4em',
});

const onSearchClick = () => {
  sendMessageToContentScript(
    { getParas: true },
    response => {
      console.log('[app.js] response', response);

      const { paras } = response;
      const text = paras.join(' ');
      console.log('[app.js] text', text);
    },
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppBar position="static">
          <ToolBar>
            <Typography variant="h4">Findit</Typography>
          </ToolBar>
        </AppBar>

        <AppGridContainer
          justify="center"
          alignItems="center"
          container
        >
          <Grid item xs={12}>
            <TextField
              id="question-text-field"
              label="Question"
              placeholder="Ask a question"
              variant="outlined"
              autoFocus
              fullWidth
            />
          </Grid>
          
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSearchClick}
            >
              Search
            </Button>
          </Grid>
        </AppGridContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
