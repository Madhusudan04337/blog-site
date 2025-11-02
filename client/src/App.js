import { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
    TextField, Button, Box, CssBaseline, CardActions, Stack
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: { default: '#f4f6f8', paper: '#ffffff' },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: { fontWeight: 600 },
    },
    shape: { borderRadius: 8 },
});

// --- Styled Post Title (Unchanged) ---
const PostTitle = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    fontWeight: 600,
}));

// --- Helper Function (Unchanged) ---
const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 80%, 92%)`;
};


function App() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        axios.get(`${apiUrl}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddPost = (event) => {
        event.preventDefault(); 
        axios.post(`${apiUrl}/posts`, newPost)
            .then(response => {
                setPosts(prevState => [response.data, ...prevState]);
                setNewPost({ title: '', content: '' });
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

    const handleDeletePost = (id) => {
        axios.delete(`${apiUrl}/posts/${id}`)
            .then(() => {
                setPosts(prevState => prevState.filter(
                    post => post._id !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                {/* 1. --- Removed position="sticky" --- */}
                <AppBar position="static" elevation={2}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            My Blog
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                            <Card elevation={3}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                                        <CreateIcon color="primary" sx={{ mr: 1.5 }} />
                                        <Typography variant="h5" component="h2">
                                            Create a New Post
                                        </Typography>
                                    </Box>
                                    
                                    <Box component="form" onSubmit={handleAddPost} noValidate>
                                        <Stack spacing={2.5}>
                                            <TextField
                                                label="Post Title"
                                                name="title"
                                                value={newPost.title}
                                                onChange={handleInputChange}
                                                fullWidth
                                                variant="outlined"
                                            />
                                            <TextField
                                                label="What's on your mind?"
                                                name="content"
                                                value={newPost.content}
                                                onChange={handleInputChange}
                                                multiline
                                                rows={4}
                                                fullWidth
                                                variant="outlined"
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddIcon />}
                                                fullWidth
                                                disabled={!newPost.title || !newPost.content}
                                                sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
                                            >
                                                Publish Post
                                            </Button>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                            <Grid container spacing={3}>
                                {posts.map(post => (
                                    <Grid key={post._id} size={{ xs: 12 }}>
                                        <Card 
                                            elevation={3} 
                                            sx={{ 
                                                backgroundColor: stringToColor(post._id)
                                                // Removed fixed height and flex styles
                                            }}
                                        >
                                            <CardContent sx={{ p: 3 }}>
                                                <PostTitle variant="h5">
                                                    {post.title}
                                                </PostTitle>
                                                
                                                <Typography 
                                                    variant="body2" 
                                                    color="text.secondary" 
                                                    sx={{ whiteSpace: 'pre-wrap' }}
                                                >
                                                    {post.content}
                                                </Typography>
                                            </CardContent>
                                            
                                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeletePost(post._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;