<ThemeProvider theme={createTheme()}>
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardLayout title="Menu" />
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
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={sampleMenuItem.imageUrl}
                                        alt={sampleMenuItem.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {sampleMenuItem.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {sampleMenuItem.calories} calories per serving
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Ingredients: {sampleMenuItem.ingredients}
                                        </Typography>
                                        <Stack direction="row" alignItems="center">
                                            <StarRateIcon color="primary" />
                                            <Typography variant="body2" color="text.secondary">
                                                {sampleMenuItem.customerRating} / 5
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" color="error">
                                            Warning: {sampleMenuItem.warning}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="large" color="primary">
                                            Add to Shopping Cart
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </LocalizationProvider>
        </Box >
    </Box>
</ThemeProvider >