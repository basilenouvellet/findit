import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { styled, ThemeProvider } from '@material-ui/core/styles';

import theme from './theme.js';
import { sendMessageToContentScript } from './utils/chrome';

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

interface Answer{
  answer: string,
  score: number,
  start: number,
  end: number
}

const App: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<null | Answer>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const onSearchClick = () => {
    setAnswer(null);

    sendMessageToContentScript({ getParas: true }, async response => {
      console.log('[app.js] response', response);

      const { paras } = response;
      const text = paras.join(' ');

      console.log('[app.js] before fetch, question:', question);
      console.log('[app.js] before fetch, text:', text);
      
      const rawRes = await fetch('http://localhost:5000/api/nlp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          context: text,
        }),
      });

      const jsonRes = await rawRes.json();

      console.log('[app.js] json response from Findit API', jsonRes);
      setAnswer(jsonRes.data.answer);
    });
  };

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
              onChange={handleChange}
              autoFocus
              fullWidth
            />
          </Grid>

          {answer &&
            <Grid item xs={12}>
              <div style={{ fontSize: '1.2em' }}>
                <b>{answer.answer}</b>
                <br/>
                <br/>
                (Score: {answer.score.toFixed(2)}%) [{answer.start} - {answer.end}]
              </div>
            </Grid>
          }

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
