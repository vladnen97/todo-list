import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import React from 'react'
import { useFormik, FormikHelpers } from 'formik'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../common/selectors/auth.selectors'
import { authThunks } from '../store/auth-reducer'
import { LoginParamsType } from '../api/auth-api'
import { ResponseType } from '../api'
import { useAppSelector } from '../hooks'
import { useAppDispatch } from '../hooks'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const validate = (values: FormikErrorType) => {
    // const errors: FormikErrorType = {};
    // if (!values.email) {
    //     errors.email = "Required";
    // } else if (!/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    //     errors.email = "Invalid email address";
    // }
    //
    // if (!values.password) {
    //     errors.password = "Required";
    // } else if (values.password.length < 3) {
    //     errors.password = "Must be 3 characters or more";
    // }
    //
    // return errors;
}

export const Login = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            dispatch(authThunks.login(values))
                .unwrap()
                .catch((data: ResponseType) => {
                    const { fieldsErrors } = data

                    fieldsErrors?.forEach(el => formikHelpers.setFieldError(el.field, el.error))
                })
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <Grid container justifyContent={'center'} style={{ padding: '40px 20px' }}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    {' '}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                variant={'standard'}
                                {...formik.getFieldProps('email')}
                                error={!!formik.errors.email && formik.touched.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                variant={'standard'}
                                {...formik.getFieldProps('password')}
                                error={!!formik.errors.password && formik.touched.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <FormControlLabel label={'Remember me'} control={<Checkbox {...formik.getFieldProps('rememberMe')} />} />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}
