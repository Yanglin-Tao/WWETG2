
<Box
    component="main"
    sx={{
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }}
>
    <Toolbar />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>Today's Menu</Title>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <Box sx={{ my: 3, mx: 2 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h4" component="div">
                                            Food Items:
                                        </Typography>
                                    </Grid>
                                    {/* Display the Shopping Cart using Cards */}
                                    <Grid container spacing={4}>
                                        {cards.map((card) => (
                                            <Grid item key={card} xs={12} sm={6} md={4}>
                                                <Card
                                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <CardMedia
                                                        component="div"
                                                        sx={{
                                                            pt: '56.25%',
                                                        }}
                                                        image="https://source.unsplash.com/random?wallpapers"
                                                    />
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            Food Item Name
                                                        </Typography>
                                                        <Typography>
                                                            Rating: 5 stars
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            onClick={() => handleAddToCart({ name: 'Food Item Name', calories: 300 })}
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                        <Button size="small">View Details</Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider variant="middle" />
                        </Box>

                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    </LocalizationProvider>
</Box >