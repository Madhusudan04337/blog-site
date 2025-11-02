import React, {
    useState,
    useEffect
} from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://localhost:3000';

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

    const handleAddPost = () => {
        axios.post(`${apiUrl}/posts`, newPost)
            .then(response => {
                setPosts(prevState => [...prevState,
                response.data]);
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
        <div className="app">
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <Typography variant="h6">
                        My Blog
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} disableGutters>
                <Grid container spacing={2} disableEqualOverflow>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ p: 2 }}>
                        <Card sx={{ width: '100%' }}>
                            <CardContent className="card-content">
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={newPost.title}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Content"
                                    name="content"
                                    value={newPost.content}
                                    onChange={handleInputChange}
                                    multiline
                                    fullWidth
                                    margin="normal"

                                />
                            </CardContent>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                className="add-post-button"
                                onClick={handleAddPost}
                            >
                                Add Post
                            </Button>
                        </Card>
                    </Grid>
                    {posts.map(post => (
                        <Grid key={post._id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ p: 1 }}>
                            <Card sx={{ width: '100%' }}>
                                <CardContent className="card-content">
                                    <Typography variant="h5"
                                        className="post-title"
                                        sx={{
                                            backgroundColor: '#f0f0f0',
                                            padding: '8px',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2"
                                        className="post-content" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {post.content}
                                    </Typography>
                                </CardContent>
                                <div className="card-actions">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={
                                            () => handleDeletePost(post._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default App;