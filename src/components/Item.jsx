import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const CustomItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingRight:  theme.spacing(3),
    paddingBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  }));


function Item({children}) {
    return (
        <CustomItem>
             {children}
        </CustomItem>
    );
}

export default Item;
