'use client'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button, Grid, TextField, Card, Typography,Divider } from '@mui/material'
import { Box, Input, Container } from '@chakra-ui/react'
import localFont from 'next/font/local'
import SlideShow from '../components/SliderShow'
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
const myFont = localFont({ src: '../components/fonts/Caprasimo-Regular.ttf' })
export default function Home() {
  const [art, setArt] = React.useState();
  const [mus, setMus] = React.useState();
  const [lyrics, setLyrics] = React.useState();
  async function resquestMusic() {
    const key = '05f59b4739df434b6fa440100dd6c7b8'
    await axios.get(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`)
      .then((res) => {

        if (res.data.type == "exact" || res.data.type == "aprox") {
          const { text } = res.data.mus[0]
          setLyrics(text)
          SlideShow(text, art, mus)
        }
      })
  }

  return (
    <Grid style={{position:"absolute",height:"100%",width:"100%"}}>
      <Grid style={{width:"100%", height:"5vh", background:"#2a2338"}}></Grid>
      <Container style={{display:"grid", justifyContent:"center", height:"50vh"}}>
        <Grid style={{display:"flex",justifyContent:"center", alignItems:"flex-end"}}>
        <Image title='logo'  alt='logo' src={'/image/stuune.png'} width={298} height={150} style={{objectFit:"contain"}}></Image>
        </Grid>
        <Grid item lg={12} justifyContent="center" >
          <TextField 
          placeholder='Cantor/Banda'
          size='small' 
          style={{margin:10, background:"#fff"}}
        />
          <TextField 
          placeholder='Música'
          size='small' 
          style={{margin:10,background:"#fff"}}/>
          <Fab>
            <SearchIcon/>
          </Fab>
        </Grid>

      </Container >
      <Container container mb={12} style={{display:"flex",height:"60vh",width:"100%",justifyContent:"space-between", }}>
        <Card item mb={12} style={{height:"100%",width:"70%",background:"#8B51FF", margin:"0px 10px"}}>
          <Typography variant='h5' align='center' style={{padding:10, color:"#fff"}}>Como pesquisar ?</Typography>
        </Card>
        <Card item mb={12} style={{height:"100%",width:"70%",background:"#8B51FF"}}>
          <Typography variant='h5' align='center' style={{padding:10, color:"#fff"}}>Como visualizar?</Typography>
        </Card>
        <Card item mb={12} style={{height:"100%",width:"70%",background:"#8B51FF", margin:"0px 10px"}}>
          <Typography variant='h5' align='center' style={{padding:10, color:"#fff"}}>Como baixar?</Typography>
        </Card>
      </Container >
      <footer style={{width:"100%", height:"5vh", background:"#2a2338", marginTop:10}}></footer>
    </Grid>
  )
}
