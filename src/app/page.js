'use client'
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Grid, TextField, Card, Typography, Divider, InputAdornment } from '@mui/material';
import { Box, Input, Container, Paper, AppBar, Toolbar } from '@mui/material'; // Importe as bibliotecas corretas para AppBar e Toolbar
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import localFont from 'next/font/local';
import SlideShow from '../components/SliderShow';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import { Dosis } from 'next/font/google'
import useMediaQuery from '@mui/material/useMediaQuery';
const inter = Dosis({ subsets: ['latin'] })
const myFont = localFont({ src: '../components/fonts/Caprasimo-Regular.ttf' });

export default function Home() {
  const isMobile = useMediaQuery('(max-width:600px)')
  const [art, setArt] = React.useState('');
  const [mus, setMus] = React.useState('');
  const [lyrics, setLyrics] = React.useState('');
  const [steps, setSteps] = React.useState(0);
  const [artFound, setArtFound] = React.useState('');
  const [musFound, setMusFound] = React.useState('');
  const [fullScreenActive, setFullScreenActive] = React.useState('');
  async function requestMusic() {
    const key = '05f59b4739df434b6fa440100dd6c7b8';
    await axios
      .get(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`)
      .then((res) => {
        if (res.data.type === 'exact' || res.data.type === 'aprox') {
          const { text } = res.data.mus[0];
          setArtFound(res.data.art.name);
          setMusFound(res.data.mus[0].name)
          setLyrics(text);
          // SlideShow(text, art, mus);

        }
      });
  }
  function toggleFullScreen(id) {

    var div = document.getElementById(id);

    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      setFullScreenActive(true)
      if (div.requestFullScreen) {
        div.requestFullScreen();
      } else if (div.mozRequestFullScreen) {
        div.mozRequestFullScreen();
      } else if (div.webkitRequestFullScreen) {
        div.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      setFullScreenActive(false)
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  return (
    !isMobile ?
      <Grid style={{ position: 'absolute', height: '100%', width: '100%', background: 'url(https://static.vecteezy.com/ti/fotos-gratis/p3/15268125-viajante-turistagrafo-em-pe-no-topo-verde-na-montanha-segurando-na-cameragrafica-digital-de-maos-alpinista-tirandografia-garota-aprecia-a-paisagem-panoramica-da-natureza-em-viagem-gratis-foto.jpg)' }}>
        <AppBar position="static" style={{ background: '#e4e4e4' }}>
          <Toolbar>
            <Image title="logo" alt="logo" src={'/image/stuunee.png'} width={175} height={55} />
          </Toolbar>
        </AppBar>

        <Grid container style={{ height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'space-between' }}>
          <Grid item style={{ background: '#1E1E1E', padding: '16px', width: '19vw' }}>
            <Typography variant="h6" className={inter.className} color='#fff'>Pesquise por sua música!</Typography>
            <TextField
              style={{ background: 'white', borderRadius: '20px' }}
              label="Artista"
              variant="outlined"
              fullWidth margin="normal"
              value={art}
              onChange={(e) => setArt(e.target.value)}
              size='small'
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <GraphicEqIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ background: 'white', borderRadius: '20px' }}
              label="Música"
              variant="outlined"
              fullWidth
              margin="normal"
              value={mus}
              onChange={(e) => setMus(e.target.value)}
              size='small'
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <AudiotrackIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Fab size='medium' variant="extended" color="primary" onClick={requestMusic}>
                <SearchIcon sx={{ mr: 1 }} />
                Pesquisar
              </Fab>
            </Grid>
            <Divider style={{ margin: '8px 0', color: '#f3f3f3' }} />
            <Grid>
              {/* <Typography className={inter.className} variant="h6" color='#fff'>Personalização</Typography> */}
            </Grid>
          </Grid>

          <Grid item
            id='fullScreen'
            style={{
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: '16px',
              gap: 10,
              width: '80%'
            }}>
            <Paper elevation={3} style={{ padding: '16px', height: !fullScreenActive ? '65vh' : '90%', width: !fullScreenActive ? '80%' : '100%' }}>
              <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">{artFound && musFound ? `${artFound} - ${musFound}` : ''}</Typography>
              </Grid>
              <Divider style={{ margin: '8px 0' }} />
              <Grid style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                overflowY: 'auto',
                height: '90%',
              }}>{lyrics.split('\n\n')[steps].split('\n').map((line, index) => (
                <div>
                  <Typography style={{ fontSize: 36 }} key={index}>
                    {line}
                  </Typography>
                </div>
              ))}
              </Grid>
            </Paper>
            <Grid style={{ display: 'flex', width: !fullScreenActive ? '80%' : '100%', justifyContent: 'space-between', gap: 10, padding: 10, borderRadius: 10 }}>
              <Grid style={{ display: 'flex', gap: 10 }}>
                <Fab size='medium' variant="extended" color="primary" onClick={() => setSteps(steps - 1 <= 0 ? 0 : steps - 1)}>
                  <NavigateBeforeIcon />

                </Fab>
                <Fab size='medium' variant="extended" color="primary" onClick={() => setSteps(steps + 1 >= lyrics.split('\n\n').length ? lyrics.split('\n\n').length - 1 : steps + 1)}>
                  <NavigateNextIcon />

                </Fab>
              </Grid>
              <Grid style={{ display: 'flex', gap: 10 }}>
                <Fab size='medium' variant="extended" color="primary" onClick={() => SlideShow(lyrics, artFound, musFound)}>
                  <DownloadIcon />
                </Fab>
                <Fab size='medium' variant="extended" color="primary" onClick={() => toggleFullScreen('fullScreen')}>
                  {!fullScreenActive ? <FullscreenIcon /> : <FullscreenExitIcon />}

                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      :
      <Grid style={{ position: 'absolute', width: '100%', background: 'url(https://static.vecteezy.com/ti/fotos-gratis/p3/15268125-viajante-turistagrafo-em-pe-no-topo-verde-na-montanha-segurando-na-cameragrafica-digital-de-maos-alpinista-tirandografia-garota-aprecia-a-paisagem-panoramica-da-natureza-em-viagem-gratis-foto.jpg)' }}>
        <AppBar position="static" style={{ background: '#e4e4e4' }}>
          <Toolbar>
            <Image title="logo" alt="logo" src={'/image/stuunee.png'} width={175} height={55} />
          </Toolbar>
        </AppBar>

        <Grid container style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item style={{ background: '#1E1E1E', padding: '16px', width: '100vw' }}>
            <Typography variant="h6" className={inter.className} color='#fff'>Pesquise por sua música!</Typography>
            <TextField
              style={{ background: 'white', borderRadius: '20px' }}
              label="Artista"
              variant="outlined"
              fullWidth margin="normal"
              value={art}
              onChange={(e) => setArt(e.target.value)}
              size='small'
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <GraphicEqIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ background: 'white', borderRadius: '20px' }}
              label="Música"
              variant="outlined"
              fullWidth
              margin="normal"
              value={mus}
              onChange={(e) => setMus(e.target.value)}
              size='small'
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <AudiotrackIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Fab size='medium' variant="extended" color="primary" onClick={requestMusic}>
                <SearchIcon sx={{ mr: 1 }} />
                Pesquisar
              </Fab>
            </Grid>
            <Divider style={{ margin: '8px 0', color: '#f3f3f3' }} />
            <Grid>
              {/* <Typography className={inter.className} variant="h6" color='#fff'>Personalização</Typography> */}
            </Grid>
          </Grid>

          <Grid item
            id='fullScreen'
            style={{
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: '16px',
              gap: 10,
              width: '100%'
            }}>
            <Paper elevation={3} style={{ padding: '16px', height: !fullScreenActive ? '65vh' : '90vh', width: '100%' }}>
              <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">{artFound && musFound ? `${artFound} - ${musFound}` : ''}</Typography>
              </Grid>
              <Divider style={{ margin: '8px 0' }} />
              <Grid style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                overflowY: 'auto',
                height: '90%',
              }}>{lyrics.split('\n\n')[steps].split('\n').map((line, index) => (
                <div>
                  <Typography style={{ fontSize: 36 }} key={index}>
                    {line}
                  </Typography>
                </div>
              ))}
              </Grid>
            </Paper>
            <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: 10, }}>

              <Grid style={{ display: 'flex', gap: 10 }}>
                <Fab size='medium' variant="extended" color="primary" onClick={() => setSteps(steps - 1 <= 0 ? 0 : steps - 1)}>
                  <NavigateBeforeIcon />

                </Fab>
                <Fab size='medium' variant="extended" color="primary" onClick={() => setSteps(steps + 1 >= lyrics.split('\n\n').length ? lyrics.split('\n\n').length - 1 : steps + 1)}>
                  <NavigateNextIcon />

                </Fab>
              </Grid>
              <Grid style={{ display: 'flex', gap: 10 }}>
                <Fab size='medium' variant="extended" color="primary" onClick={() => SlideShow(lyrics, artFound, musFound)}>
                  <DownloadIcon />
                </Fab>
                <Fab size='medium' variant="extended" color="primary" onClick={() => toggleFullScreen('fullScreen')}>
                  {!fullScreenActive ? <FullscreenIcon /> : <FullscreenExitIcon />}

                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
  );
}
