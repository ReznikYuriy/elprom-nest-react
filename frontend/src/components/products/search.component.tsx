import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActionCreator } from '../../store/slices';
import { RootState } from '../../store/types';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));


const SearchComponent: React.FC = () => {
    const [searchText, setSearchText] = useState("")
    const [timerId, setTimerId] = useState<any>(0);
    const dispatch = useDispatch();
    const activeCategoryName = useSelector(
        (state: RootState) => (state.productReducer.activeCategoryName),
    );

    function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(timerId);
        setSearchText(event.target.value);
        const _timerId = setTimeout(
            () => {
                dispatch<any>(ProductsActionCreator.getProductsBySearchAsync(event.target.value))
            }
            , 500);

        setTimerId(_timerId);
    }

    useEffect(() => {
        setSearchText("")
    }, [activeCategoryName])

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='поиск по складу'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleQueryChange}
                value={searchText}
            />
        </Search>
    );
};
export default SearchComponent;