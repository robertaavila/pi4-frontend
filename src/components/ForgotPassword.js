import React from "react";
import {getUrlServer} from "../util/env";

class ForgotPassword extends React.Component {

    state = {
        email: null,
        senha: null,
        loading: this.props.loading ? this.props.loading : false
    }

    handleChange = (event) => this.setState({[event.target.name]: event.target.value})

    handleSubmit = () => this.props.handleSubmit(this.state);
    handleClose = () => {
        this.setState({modal: false})
    }
    alterarSenha = () => {
        if (this.state.email == "" || this.state.email == null) {
            this.setState({
                modal: true,
                modalMessage: "Informe o e-mail!",
                modalError: true,
                loading: false
            });
            return;
        }
        const SERVER_URL = getUrlServer();
        fetch(SERVER_URL + 'acesso/solicita_alteracao_senha/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email})
        }).then(resp => {
            if (resp.statusText === "Not Found" || resp.statusText === "Internal Error") {
                this.setState({
                    modal: true,
                    modalMessage: "Nossos servidores se encontram indisponíveis no momento, tente novamente mais tarde.",
                    modalError: true,
                    loading: false
                });
            }
            return resp.json();
        })
            .then(data => {
                if (typeof data.errors != 'undefined') {
                    this.setState({
                        modal: true,
                        modalMessage: data.errors,
                        modalError: true,
                        loading: false
                    });
                    return false;
                }
                this.setState({
                    modal: true,
                    modalMessage: `Enviamos um e-mail para ${this.state.email} com as instruções para alteração da senha!`,
                    modalError: true,
                    loading: false
                });
            })
            .catch(error => {
                if (error.statusText === "Not Found" || error.statusText === "Internal Error") {
                    this.setState({
                        modal: true,
                        modalMessage: "Nossos servidores se encontram indisponíveis no momento, tente novamente mais tarde.",
                        modalError: true,
                        loading: false
                    });
                }
                console.error(error);
            });
    }

    render() {
        return (
            <section>
                <div className="navbar-brand">
                    <div className="column is-centered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.478 28.846" height="4vh">
                            <g transform="translate(0.5 0.5)" fill="#FFF">
                                <g transform="translate(0 0)">
                                    <path className="a"
                                          d="M284.5,27.846H0V24.364H5.278v-.6H0V20.308H5.278v-.6H0V16.251H5.278v-.6H0V12.2H5.278v-.6H0V8.14H5.278v-.6H0V4.084H5.278v-.6H0V0H84.5V3.481H79.227v.6H84.5V7.538H79.227v.6H84.5v3.453H79.227v.6H84.5v3.453H79.227v.6H84.5V19.7H79.227v.6H84.5v3.453H79.227v.6H84.5v3.481ZM47.3,18.213h0c-.412,2.092-.142,3.737.805,4.889,1.2,1.458,3.449,2.167,6.88,2.167a13.965,13.965,0,0,0,6.7-1.586,7.3,7.3,0,0,0,3.8-4.867c.465-2.193.028-3.774-1.335-4.834a11.87,11.87,0,0,0-4.48-1.7c-.45-.106-.875-.206-1.281-.316-1.416-.4-3.177-.892-2.855-2.419a2.945,2.945,0,0,1,2.878-1.9,2.748,2.748,0,0,1,2.078.662,1.823,1.823,0,0,1,.359,1.842h5.758a4.742,4.742,0,0,0-.486-4.311c-1.466-1.934-4.687-2.223-6.476-2.223A13.68,13.68,0,0,0,53.384,4.91a7.5,7.5,0,0,0-3.963,4.983,5.306,5.306,0,0,0,.136,3.03,3.7,3.7,0,0,0,1.922,2.036,21.533,21.533,0,0,0,4.331,1.429c2.287.568,3.939.979,3.557,2.774-.3,1.43-2.208,2.074-3.464,2.074a3.073,3.073,0,0,1-2.5-.929,2.407,2.407,0,0,1-.342-2.093H47.3Zm-39.984,0c-.413,2.092-.142,3.736.8,4.888,1.2,1.459,3.45,2.168,6.882,2.168a13.96,13.96,0,0,0,6.7-1.586A7.3,7.3,0,0,0,25.5,18.816c.465-2.193.028-3.774-1.334-4.834a11.87,11.87,0,0,0-4.48-1.7c-.45-.106-.875-.206-1.281-.316-1.415-.4-3.176-.892-2.855-2.419a2.948,2.948,0,0,1,2.878-1.9,2.748,2.748,0,0,1,2.078.662,1.821,1.821,0,0,1,.359,1.842h5.758a4.741,4.741,0,0,0-.486-4.311c-1.466-1.934-4.687-2.223-6.477-2.223A13.68,13.68,0,0,0,13.4,4.91,7.5,7.5,0,0,0,9.437,9.893a5.309,5.309,0,0,0,.137,3.03A3.7,3.7,0,0,0,11.5,14.959a21.525,21.525,0,0,0,4.33,1.429c2.286.568,3.938.979,3.557,2.774-.3,1.43-2.208,2.074-3.464,2.074a3.072,3.072,0,0,1-2.5-.93,2.406,2.406,0,0,1-.341-2.092H7.321ZM71.792,4.05,67.374,24.834h5.757L77.55,4.05Zm-39.926,0L27.447,24.834H43.28l.858-4.03H34.063L35,16.4h9.27l.854-4.03h-9.27l.912-4.289H46.84L47.7,4.05Z"
                                          transform="translate(32.438 0)"/>
                                    <path className="a"
                                          d="M29.582,27.842H0V0H29.582V27.841Zm-26.1-4.081v.6H26.1v-.6ZM16.076,20.7h0l-.548,2.649h1.961l.112-.574h-1.21l.462-2.074h-.777Zm-2.447,0h0l-.549,2.649h2.046l.117-.549h-1.3l.117-.516h1.182l.113-.548H14.175l.116-.52h1.265l.118-.516H13.629Zm-1.156,0L11.9,23.347h.778l.546-2.649ZM3.481,19.7v.6H26.1v-.6Zm6-1.274-.747,0-.007.059-.008.058c0,.019,0,.039,0,.059s0,.04,0,.059a.7.7,0,0,0,.183.474,1.054,1.054,0,0,0,.782.21,1.517,1.517,0,0,0,1.038-.31.919.919,0,0,0,.346-.7.644.644,0,0,0-.009-.108.436.436,0,0,0-.031-.112.547.547,0,0,0-.166-.223.841.841,0,0,0-.368-.161,3.1,3.1,0,0,1-.51-.152c-.14-.056-.211-.122-.211-.2a.218.218,0,0,1,.1-.188.466.466,0,0,1,.225-.083h.048a.385.385,0,0,1,.208.057.192.192,0,0,1,.089.184.339.339,0,0,1,0,.041.191.191,0,0,1-.009.044l.75,0a.966.966,0,0,0,.031-.138,1.028,1.028,0,0,0,.009-.125.472.472,0,0,0-.238-.445,1.3,1.3,0,0,0-.516-.148l-.089-.005c-.031,0-.061,0-.091,0a1.74,1.74,0,0,0-.9.227.868.868,0,0,0-.423.72.488.488,0,0,0,.3.519c.032.014.062.024.085.031s.054.019.076.028l.012,0,.009,0a1.5,1.5,0,0,0,.166.052l.2.054a2.393,2.393,0,0,1,.308.11c.092.041.139.093.139.154v.032a.217.217,0,0,1-.081.176.555.555,0,0,1-.178.1.715.715,0,0,1-.11.027.554.554,0,0,1-.092.009.309.309,0,0,1-.246-.089.353.353,0,0,1-.076-.233v-.038a.217.217,0,0,1,0-.046Zm10.945-1.785-.574,2.648h.778l.545-2.648Zm-2.8,2.128h1.039l.085.519h.838l-.49-2.648h-.922l-1.584,2.648h.75l.285-.519Zm-2.822-1.491.489,2.011h1.04l.574-2.648h-.692l-.432,1.9-.46-1.9H14.258l-.548,2.648H14.4l.4-2.011Zm-2.994-.637h0l-.548,2.648h2.044l.117-.548h-1.3l.117-.517h1.181l.114-.549H12.357l.116-.519h1.265l.117-.515H11.811Zm-8.33-1v.6H26.1v-.6ZM16.3,14.377l-.746,0-.007.059-.008.058c0,.02,0,.04,0,.059s0,.039,0,.059a.7.7,0,0,0,.182.475,1.066,1.066,0,0,0,.784.208,1.519,1.519,0,0,0,1.036-.309.919.919,0,0,0,.347-.7.741.741,0,0,0-.009-.106.542.542,0,0,0-.2-.336.829.829,0,0,0-.368-.16,3.229,3.229,0,0,1-.509-.152c-.14-.057-.211-.123-.211-.2a.222.222,0,0,1,.1-.19.471.471,0,0,1,.226-.081h.048a.377.377,0,0,1,.208.057.2.2,0,0,1,.088.185c0,.01,0,.022,0,.035v.006a.2.2,0,0,1-.009.044l.75,0a.832.832,0,0,0,.031-.139.753.753,0,0,0,.01-.123.473.473,0,0,0-.238-.445,1.285,1.285,0,0,0-.517-.149l-.089,0c-.031,0-.061,0-.09,0a1.736,1.736,0,0,0-.9.227.87.87,0,0,0-.424.721.555.555,0,0,0,.094.362.577.577,0,0,0,.2.157l.006,0c.027.011.052.021.078.029a.777.777,0,0,1,.076.027l.013.005.01,0a1.657,1.657,0,0,0,.164.051l.205.055a2.319,2.319,0,0,1,.307.11c.092.041.139.093.139.154v.032a.215.215,0,0,1-.079.175.58.58,0,0,1-.18.1.819.819,0,0,1-.11.027.468.468,0,0,1-.091.01.307.307,0,0,1-.246-.091.34.34,0,0,1-.076-.231v-.039A.3.3,0,0,1,16.3,14.377Zm-5.1,0-.746,0-.007.059-.008.058c0,.02,0,.04,0,.059s0,.038,0,.059a.707.707,0,0,0,.183.475,1.06,1.06,0,0,0,.782.208,1.522,1.522,0,0,0,1.038-.309.921.921,0,0,0,.346-.7.633.633,0,0,0-.009-.106.551.551,0,0,0-.031-.112.569.569,0,0,0-.166-.223.845.845,0,0,0-.368-.16,3.229,3.229,0,0,1-.51-.152c-.14-.057-.211-.123-.211-.2a.219.219,0,0,1,.1-.19.463.463,0,0,1,.225-.081h.048a.378.378,0,0,1,.208.057.191.191,0,0,1,.088.185c0,.01,0,.022,0,.035v.006a.273.273,0,0,1-.009.044l.75,0a.847.847,0,0,0,.031-.139.857.857,0,0,0,.009-.123.469.469,0,0,0-.238-.445,1.275,1.275,0,0,0-.515-.149l-.091,0c-.03,0-.06,0-.089,0a1.742,1.742,0,0,0-.9.227.866.866,0,0,0-.422.721.49.49,0,0,0,.3.519c.03.012.058.023.085.032a.638.638,0,0,1,.076.027l.012.005.009,0c.052.019.108.036.165.051l.205.055a2.392,2.392,0,0,1,.308.11c.091.041.138.093.138.154v.032a.213.213,0,0,1-.08.175.555.555,0,0,1-.178.1.862.862,0,0,1-.111.027.482.482,0,0,1-.091.01.307.307,0,0,1-.246-.091.343.343,0,0,1-.076-.231v-.039A.3.3,0,0,1,11.208,14.377Zm7.484-1.786-.574,2.65H18.9l.544-2.65Zm-5.151,0h0l-.549,2.65h2.045l.118-.549h-1.3l.117-.516h1.182l.113-.549H14.086l.117-.519h1.266l.117-.517H13.541Zm-10.06-1v.6H26.1v-.6ZM19.789,8.455a1.522,1.522,0,0,0-1.066.356,1.791,1.791,0,0,0-.477.748,2.038,2.038,0,0,0-.078.357,2.678,2.678,0,0,0-.022.32c0,.024,0,.045,0,.066v.034c0,.033,0,.066,0,.1a1.015,1.015,0,0,0,.238.56,1.052,1.052,0,0,0,.823.252h.062a1.6,1.6,0,0,0,.741-.15,1.4,1.4,0,0,0,.441-.333.956.956,0,0,0,.153-.244.526.526,0,0,0,.049-.184l0-.02,0-.021-.776,0a.375.375,0,0,1-.107.22.623.623,0,0,1-.2.145.745.745,0,0,1-.082.028.364.364,0,0,1-.075.009l-.044,0h-.04a.319.319,0,0,1-.31-.147.708.708,0,0,1-.082-.354c0-.042,0-.085.005-.128s.009-.09.017-.137a.533.533,0,0,1,.009-.065c0-.023.007-.044.013-.066a1.542,1.542,0,0,1,.241-.595.68.68,0,0,1,.319-.251l.027-.005.037-.007a.434.434,0,0,1,.068-.005c.025,0,.051,0,.078,0a.732.732,0,0,1,.094.014.433.433,0,0,1,.162.085.243.243,0,0,1,.075.194c0,.009,0,.019,0,.031s0,.03,0,.042l.8,0a.673.673,0,0,0,.021-.106.924.924,0,0,0,0-.1.491.491,0,0,0-.233-.454,1.391,1.391,0,0,0-.513-.178c-.07-.011-.133-.017-.193-.021h-.011C19.9,8.457,19.842,8.455,19.789,8.455Zm-3.6,1.869-.746,0-.008.059-.007.058c0,.02,0,.04,0,.058s0,.041,0,.059a.7.7,0,0,0,.184.476,1.06,1.06,0,0,0,.782.208,1.518,1.518,0,0,0,1.038-.31.925.925,0,0,0,.346-.7.777.777,0,0,0-.009-.108.5.5,0,0,0-.031-.111.571.571,0,0,0-.167-.224.856.856,0,0,0-.367-.16,3.1,3.1,0,0,1-.51-.152c-.142-.058-.212-.123-.212-.2a.221.221,0,0,1,.105-.188.474.474,0,0,1,.225-.082h.047a.387.387,0,0,1,.209.057.193.193,0,0,1,.088.184c0,.008,0,.015,0,.023V9.3a.147.147,0,0,1-.009.043l.751,0a1.178,1.178,0,0,0,.031-.139,1.008,1.008,0,0,0,.008-.124.47.47,0,0,0-.237-.445,1.3,1.3,0,0,0-.517-.148c-.022,0-.045,0-.067-.005h-.022l-.09,0a1.739,1.739,0,0,0-.9.228.856.856,0,0,0-.422.721.551.551,0,0,0,.094.362.569.569,0,0,0,.2.157c.031.013.059.024.085.031a.782.782,0,0,1,.077.028l.012,0,.01,0a1.523,1.523,0,0,0,.164.05l.145.038.061.016a2.173,2.173,0,0,1,.308.11c.093.041.139.093.139.154v.033a.216.216,0,0,1-.081.175.55.55,0,0,1-.179.1.69.69,0,0,1-.111.028.643.643,0,0,1-.091.009.306.306,0,0,1-.245-.09.343.343,0,0,1-.077-.231V10.37a.3.3,0,0,1,0-.046ZM10.63,8.455a1.524,1.524,0,0,0-1.066.356,1.8,1.8,0,0,0-.477.748,2.057,2.057,0,0,0-.076.357,2.532,2.532,0,0,0-.023.32c0,.024,0,.045,0,.066v.034q0,.05.005.1a1.01,1.01,0,0,0,.238.56,1.052,1.052,0,0,0,.824.252h.062a1.6,1.6,0,0,0,.741-.15,1.417,1.417,0,0,0,.441-.333.933.933,0,0,0,.153-.244.542.542,0,0,0,.049-.184l0-.02-.005-.021-.776,0a.378.378,0,0,1-.106.22.623.623,0,0,1-.2.145.8.8,0,0,1-.082.028.374.374,0,0,1-.075.009l-.044,0h-.04a.319.319,0,0,1-.31-.147.708.708,0,0,1-.082-.354c0-.038,0-.079,0-.128s.01-.089.017-.137c0-.022.005-.043.01-.065a.526.526,0,0,1,.013-.066,1.515,1.515,0,0,1,.241-.595.673.673,0,0,1,.319-.251l.025,0,.041-.007a.407.407,0,0,1,.066-.005c.025,0,.051,0,.078,0a.694.694,0,0,1,.094.014.434.434,0,0,1,.163.085.243.243,0,0,1,.076.194.247.247,0,0,1,0,.034c0,.014,0,.027-.005.039l.8,0a.582.582,0,0,0,.02-.106.96.96,0,0,0,.006-.1.492.492,0,0,0-.234-.454A1.381,1.381,0,0,0,11,8.481c-.069-.01-.133-.017-.194-.021H10.8C10.74,8.457,10.683,8.455,10.63,8.455Zm2.8.084h0l-.549,2.65h2.046l.117-.549h-1.3l.116-.517h1.183l.112-.548H13.973l.117-.519h1.266l.116-.517H13.428Zm-1.156,0-.574,2.65h.779l.544-2.65Zm-8.791-1v.6H26.1v-.6Zm16-3.136a1.527,1.527,0,0,0-1.066.357,1.806,1.806,0,0,0-.479.748,2.244,2.244,0,0,0-.076.356,2.7,2.7,0,0,0-.022.32c0,.036,0,.068,0,.1l.005.1a1.024,1.024,0,0,0,.238.559,1.048,1.048,0,0,0,.823.253h.062a1.6,1.6,0,0,0,.741-.15,1.458,1.458,0,0,0,.441-.333.953.953,0,0,0,.153-.245.525.525,0,0,0,.049-.183l0-.02-.005-.021-.776,0a.385.385,0,0,1-.106.221.606.606,0,0,1-.2.144.528.528,0,0,1-.083.028.3.3,0,0,1-.074.009.251.251,0,0,1-.045,0h-.04a.324.324,0,0,1-.31-.147.712.712,0,0,1-.082-.354c0-.041,0-.085.005-.129v-.01c0-.041.009-.083.016-.126a.533.533,0,0,1,.009-.065c0-.023.007-.044.013-.067a1.535,1.535,0,0,1,.241-.594.672.672,0,0,1,.318-.251c.022-.005.044-.009.066-.013a.347.347,0,0,1,.067-.005.657.657,0,0,1,.078,0,.6.6,0,0,1,.094.014.417.417,0,0,1,.161.085.236.236,0,0,1,.076.194l0,.034a.239.239,0,0,1-.005.038l.8,0a.694.694,0,0,0,.021-.106c0-.039,0-.07,0-.1a.491.491,0,0,0-.233-.454,1.375,1.375,0,0,0-.513-.179c-.069-.01-.134-.016-.193-.021S19.542,4.4,19.486,4.4Zm-3.6,1.87-.746,0-.008.059-.007.059c0,.02,0,.039,0,.058s0,.04,0,.059a.708.708,0,0,0,.183.476,1.067,1.067,0,0,0,.783.208,1.517,1.517,0,0,0,1.037-.31.923.923,0,0,0,.347-.7.656.656,0,0,0-.01-.108.45.45,0,0,0-.031-.112.562.562,0,0,0-.167-.223.834.834,0,0,0-.368-.161,3.113,3.113,0,0,1-.509-.152c-.14-.057-.211-.122-.211-.2a.221.221,0,0,1,.1-.188.478.478,0,0,1,.226-.083h.047a.392.392,0,0,1,.208.057.192.192,0,0,1,.088.185c0,.012,0,.024,0,.038a.159.159,0,0,1-.009.047l.751,0a.853.853,0,0,0,.03-.139.772.772,0,0,0,.01-.125.47.47,0,0,0-.237-.444,1.31,1.31,0,0,0-.517-.148l-.059,0-.03,0-.091,0a1.736,1.736,0,0,0-.9.227.868.868,0,0,0-.423.721.56.56,0,0,0,.094.362.583.583,0,0,0,.2.158c.036.014.062.024.085.031s.052.018.076.028l.012.005.01,0a1.451,1.451,0,0,0,.164.051c.064.015.128.033.205.055a2.1,2.1,0,0,1,.308.11c.093.042.14.093.14.153v.033a.219.219,0,0,1-.081.176.573.573,0,0,1-.179.1.6.6,0,0,1-.111.027.545.545,0,0,1-.091.009.312.312,0,0,1-.246-.089.351.351,0,0,1-.076-.232V6.316A.209.209,0,0,1,15.887,6.271ZM13.125,4.486h0l-.549,2.648H14.62l.118-.548h-1.3l.116-.516h1.183l.113-.549H13.669L13.787,5h1.265l.116-.516H13.125Zm-1.156,0-.574,2.648h.778l.545-2.648Zm-2.246,0L9.177,7.133h.75l.2-1.009h1.064l.118-.545H10.241L10.359,5h1.153l.084-.516Zm-6.242-1v.6H26.1v-.6ZM18.608,18.229h-.691l.578-1.123.113,1.122Z"/>
                                </g>
                                <path className="b"
                                      d="M366.075,407.2H258.854v27.847H366.075V407.2ZM264.132,430.959v.6h-5.277v-.6Zm0-4.056v.6h-5.277v-.6Zm0-4.056v.6h-5.277v-.6Zm0-4.056v.6h-5.277v-.6Zm0-4.056v.6h-5.277v-.6Zm0-4.056v.6h-5.277v-.6Zm101.943,20.281v.6H360.8v-.6Zm0-4.056v.6H360.8v-.6Zm0-4.056v.6H360.8v-.6Zm0-4.056v.6H360.8v-.6Zm0-4.056v.6H360.8v-.6Zm0-4.056v.6H360.8v-.6ZM226.413,407.2H256v27.843H226.413V407.2Zm3.481,23.761v.6h22.623v-.6Zm0-4.056v.6h22.623v-.6Zm0-4.056v.6h22.623v-.6Zm0-4.056v.6h22.623v-.6Zm0-4.056v.6h22.623v-.6Zm0-4.056v.6h22.623v-.6Zm5.7,3.653h.75l.2-1.01h1.065l.117-.545h-1.069l.118-.578h1.152l.083-.515h-1.873l-.545,2.648Zm2.217,0h.779l.546-2.648h-.75l-.574,2.648Zm1.181,0h2.045l.118-.549h-1.3l.117-.515h1.182l.113-.55h-1.182l.117-.519h1.266l.117-.515h-2.045l-.549,2.648Zm2.795-1.756v0a.552.552,0,0,0,.093.358.565.565,0,0,0,.2.157c.029.013.058.023.084.031l.078.027h0l.009.006h.01a1.446,1.446,0,0,0,.164.052l.205.055a2.2,2.2,0,0,1,.307.109c.092.041.139.093.139.154v.032a.216.216,0,0,1-.08.176.575.575,0,0,1-.18.1.763.763,0,0,1-.11.028.609.609,0,0,1-.091.009.3.3,0,0,1-.244-.089.342.342,0,0,1-.078-.233v-.038a.275.275,0,0,1,0-.046l-.746,0c0,.02,0,.039-.008.059l-.007.058c0,.02,0,.039,0,.059s0,.039,0,.059a.7.7,0,0,0,.183.475,1.056,1.056,0,0,0,.783.208,1.512,1.512,0,0,0,1.037-.309.916.916,0,0,0,.347-.7.7.7,0,0,0-.01-.108.5.5,0,0,0-.031-.112.557.557,0,0,0-.166-.223.835.835,0,0,0-.368-.161,3.2,3.2,0,0,1-.509-.152c-.141-.057-.211-.123-.211-.2a.219.219,0,0,1,.1-.188.462.462,0,0,1,.226-.082h.047a.386.386,0,0,1,.208.056.2.2,0,0,1,.088.185c0,.013,0,.026,0,.04a.175.175,0,0,1-.009.044l.75,0a1.062,1.062,0,0,0,.031-.138.951.951,0,0,0,.009-.125.471.471,0,0,0-.238-.445,1.3,1.3,0,0,0-.516-.148l-.089-.005-.089,0a1.734,1.734,0,0,0-.9.227.866.866,0,0,0-.423.72Zm2.474.8v0c0,.032,0,.064,0,.1l.006.1a1.017,1.017,0,0,0,.238.559,1.041,1.041,0,0,0,.824.252h.062a1.61,1.61,0,0,0,.741-.149,1.433,1.433,0,0,0,.441-.333.974.974,0,0,0,.153-.245.52.52,0,0,0,.048-.183l0-.021,0-.02-.775,0a.378.378,0,0,1-.107.221.6.6,0,0,1-.2.145.586.586,0,0,1-.082.027.329.329,0,0,1-.075.009.218.218,0,0,1-.044,0h-.04a.324.324,0,0,1-.309-.146.716.716,0,0,1-.082-.355c0-.041,0-.083.006-.128s.009-.089.017-.135c0-.022,0-.044.009-.066s.008-.044.013-.066a1.542,1.542,0,0,1,.241-.595.675.675,0,0,1,.318-.25l.066-.013a.379.379,0,0,1,.067-.006c.022,0,.047,0,.079,0a.842.842,0,0,1,.093.015.415.415,0,0,1,.162.084.237.237,0,0,1,.076.193c0,.011,0,.022,0,.034l0,.039.8,0a.716.716,0,0,0,.021-.106c0-.033,0-.067,0-.1a.486.486,0,0,0-.234-.454,1.4,1.4,0,0,0-.512-.18c-.066-.01-.13-.016-.193-.02s-.124-.006-.18-.006a1.521,1.521,0,0,0-1.067.356,1.81,1.81,0,0,0-.477.748,2.14,2.14,0,0,0-.077.357,2.6,2.6,0,0,0-.022.32Zm-8.856,4.053v0c0,.031,0,.064,0,.1s0,.065.006.1a1.016,1.016,0,0,0,.238.561,1.043,1.043,0,0,0,.824.252h.062a1.6,1.6,0,0,0,.741-.15,1.446,1.446,0,0,0,.441-.333.959.959,0,0,0,.153-.245.523.523,0,0,0,.048-.183l0-.021-.006-.02-.776,0a.382.382,0,0,1-.106.221.613.613,0,0,1-.2.144.487.487,0,0,1-.082.028.34.34,0,0,1-.076.009.212.212,0,0,1-.043,0h-.04a.324.324,0,0,1-.309-.146.711.711,0,0,1-.082-.354c0-.042,0-.084,0-.129s.01-.089.017-.136c0-.021.006-.043.01-.066s.008-.043.013-.066a1.53,1.53,0,0,1,.242-.594.671.671,0,0,1,.318-.251l.066-.013a.368.368,0,0,1,.066-.005l.078,0a.751.751,0,0,1,.093.015.415.415,0,0,1,.163.084.237.237,0,0,1,.076.194c0,.01,0,.022,0,.035l-.006.038.8,0a.745.745,0,0,0,.021-.106c0-.034,0-.068,0-.1a.485.485,0,0,0-.234-.454,1.386,1.386,0,0,0-.512-.18c-.066-.009-.131-.017-.194-.02s-.123-.006-.179-.006a1.518,1.518,0,0,0-1.067.357,1.809,1.809,0,0,0-.477.747,2.131,2.131,0,0,0-.076.357,2.586,2.586,0,0,0-.022.32Zm2.71.951h.779l.545-2.648h-.75l-.574,2.648Zm1.181,0h2.046l.117-.549h-1.3l.117-.516h1.182l.113-.549h-1.181l.117-.518h1.266l.117-.516h-2.046l-.549,2.648Zm2.8-1.756v0a.546.546,0,0,0,.093.358.554.554,0,0,0,.2.157c.029.013.058.022.084.031s.053.018.078.027h0l.009.006h.01a1.538,1.538,0,0,0,.165.052l.2.054a2.192,2.192,0,0,1,.307.111c.093.041.139.092.139.153v.032a.214.214,0,0,1-.08.176.574.574,0,0,1-.18.1.777.777,0,0,1-.109.028.622.622,0,0,1-.092.009.3.3,0,0,1-.244-.089.342.342,0,0,1-.078-.233v-.038a.426.426,0,0,1,0-.046l-.746,0-.008.059c0,.02,0,.039-.007.058s0,.039,0,.059,0,.039,0,.059a.7.7,0,0,0,.184.475,1.052,1.052,0,0,0,.782.209,1.516,1.516,0,0,0,1.037-.309.92.92,0,0,0,.346-.7.7.7,0,0,0-.009-.108.533.533,0,0,0-.031-.111.567.567,0,0,0-.167-.224.836.836,0,0,0-.367-.161,3.211,3.211,0,0,1-.51-.152c-.14-.057-.21-.123-.21-.2a.219.219,0,0,1,.1-.188.473.473,0,0,1,.225-.082h.047a.393.393,0,0,1,.209.057.193.193,0,0,1,.087.185c0,.012,0,.026,0,.04a.179.179,0,0,1-.009.044l.75,0a.988.988,0,0,0,.031-.138.944.944,0,0,0,.009-.125.467.467,0,0,0-.238-.444,1.267,1.267,0,0,0-.516-.148c-.029,0-.059,0-.089-.006l-.089,0a1.737,1.737,0,0,0-.9.227.862.862,0,0,0-.422.721Zm2.473.8v0c0,.031,0,.064,0,.1s0,.065,0,.1a1.017,1.017,0,0,0,.238.561,1.042,1.042,0,0,0,.823.252h.063a1.591,1.591,0,0,0,.74-.15,1.434,1.434,0,0,0,.441-.333.993.993,0,0,0,.154-.245.538.538,0,0,0,.047-.183l0-.021,0-.02-.776,0a.382.382,0,0,1-.106.221.626.626,0,0,1-.2.144.463.463,0,0,1-.083.028.33.33,0,0,1-.075.009.228.228,0,0,1-.044,0h-.04a.324.324,0,0,1-.309-.146.71.71,0,0,1-.081-.354c0-.042,0-.084,0-.129s.01-.089.017-.136c0-.021,0-.043.009-.066s.008-.043.013-.066a1.53,1.53,0,0,1,.242-.594.677.677,0,0,1,.319-.251l.065-.013a.378.378,0,0,1,.067-.005l.079,0a.813.813,0,0,1,.093.015.421.421,0,0,1,.163.084.237.237,0,0,1,.075.194.242.242,0,0,1,0,.035.234.234,0,0,1-.006.038l.8,0a.74.74,0,0,0,.021-.106.877.877,0,0,0,.006-.1.486.486,0,0,0-.235-.454,1.38,1.38,0,0,0-.512-.18c-.066-.009-.131-.017-.193-.02s-.123-.006-.18-.006a1.513,1.513,0,0,0-1.066.357,1.8,1.8,0,0,0-.477.747,2.048,2.048,0,0,0-.078.357,2.6,2.6,0,0,0-.022.32Zm-7.456,3.249v0a.552.552,0,0,0,.093.358.564.564,0,0,0,.2.157.692.692,0,0,0,.084.031l.077.028h0l.009.006.009,0c.044.017.1.033.165.051l.205.055a2.3,2.3,0,0,1,.307.109c.092.042.138.093.138.154v.033a.215.215,0,0,1-.08.176.559.559,0,0,1-.179.1.736.736,0,0,1-.11.027.581.581,0,0,1-.091.009.3.3,0,0,1-.245-.089.345.345,0,0,1-.077-.232v-.039a.265.265,0,0,1,0-.045l-.747,0-.007.059-.008.059c0,.02,0,.039,0,.058a.586.586,0,0,0,0,.059.7.7,0,0,0,.183.475,1.054,1.054,0,0,0,.783.209,1.514,1.514,0,0,0,1.037-.309.919.919,0,0,0,.346-.7.7.7,0,0,0-.009-.108.53.53,0,0,0-.031-.112.559.559,0,0,0-.166-.223.847.847,0,0,0-.368-.161,3.121,3.121,0,0,1-.51-.152c-.14-.057-.21-.123-.21-.2a.219.219,0,0,1,.1-.188.481.481,0,0,1,.225-.082h.048a.392.392,0,0,1,.208.057.2.2,0,0,1,.088.184c0,.013,0,.026,0,.04a.339.339,0,0,1-.009.044l.749,0a.911.911,0,0,0,.031-.139.934.934,0,0,0,.009-.125.465.465,0,0,0-.238-.444,1.279,1.279,0,0,0-.515-.148c-.029,0-.059,0-.089-.006l-.09,0a1.731,1.731,0,0,0-.9.227.866.866,0,0,0-.423.721Zm2.3,1.755h2.045l.118-.549h-1.3l.117-.515h1.182l.113-.549H240.5l.117-.52h1.266l.117-.515h-2.045l-.549,2.649Zm2.795-1.755v0a.552.552,0,0,0,.093.358.564.564,0,0,0,.2.157.764.764,0,0,0,.084.031l.077.028h0l.009.006.01,0a1.709,1.709,0,0,0,.164.051l.205.055a2.2,2.2,0,0,1,.307.109c.092.042.139.093.139.154v.033a.218.218,0,0,1-.08.176.573.573,0,0,1-.18.1.736.736,0,0,1-.11.027.581.581,0,0,1-.091.009.3.3,0,0,1-.244-.089.34.34,0,0,1-.078-.232v-.039a.268.268,0,0,1,0-.045l-.746,0-.008.059-.007.059c0,.02,0,.039,0,.058s0,.039,0,.059a.7.7,0,0,0,.183.475,1.054,1.054,0,0,0,.783.209,1.514,1.514,0,0,0,1.037-.309.919.919,0,0,0,.346-.7.7.7,0,0,0-.009-.108.531.531,0,0,0-.031-.112.559.559,0,0,0-.166-.223.836.836,0,0,0-.368-.161,3.08,3.08,0,0,1-.509-.152c-.141-.057-.211-.123-.211-.2a.222.222,0,0,1,.1-.188.481.481,0,0,1,.226-.082h.047a.387.387,0,0,1,.208.057.193.193,0,0,1,.088.184c0,.013,0,.026,0,.04a.174.174,0,0,1-.009.044l.75,0a1.029,1.029,0,0,0,.031-.139.922.922,0,0,0,.009-.125.469.469,0,0,0-.238-.444,1.289,1.289,0,0,0-.516-.148c-.029,0-.059,0-.089-.006l-.09,0a1.733,1.733,0,0,0-.9.227.866.866,0,0,0-.423.721Zm2.33,1.755h.779l.545-2.649h-.749l-.575,2.649Zm-9.157,2.3v0a.555.555,0,0,0,.093.359.586.586,0,0,0,.2.157l.084.031c.027.008.052.018.077.028h0l.009,0,.009,0a1.537,1.537,0,0,0,.165.051l.205.055a2.155,2.155,0,0,1,.307.11q.138.062.138.153v.033a.216.216,0,0,1-.081.176.562.562,0,0,1-.179.1.66.66,0,0,1-.11.027.606.606,0,0,1-.091.01.307.307,0,0,1-.245-.09.342.342,0,0,1-.077-.232v-.038a.27.27,0,0,1,0-.046l-.746,0-.008.058-.008.059c0,.02,0,.039,0,.059a.56.56,0,0,0,0,.058.7.7,0,0,0,.183.476,1.058,1.058,0,0,0,.783.208,1.514,1.514,0,0,0,1.037-.309.918.918,0,0,0,.346-.7.717.717,0,0,0-.009-.108.507.507,0,0,0-.031-.111.554.554,0,0,0-.166-.224.847.847,0,0,0-.368-.161,3.164,3.164,0,0,1-.51-.151c-.14-.058-.21-.123-.21-.2a.221.221,0,0,1,.1-.189.481.481,0,0,1,.226-.082h.047a.391.391,0,0,1,.208.057.2.2,0,0,1,.088.185c0,.013,0,.026,0,.041a.246.246,0,0,1-.009.043l.75,0a.9.9,0,0,0,.03-.139.8.8,0,0,0,.009-.124.466.466,0,0,0-.238-.445,1.28,1.28,0,0,0-.515-.148l-.089-.006-.09,0a1.72,1.72,0,0,0-.9.228.86.86,0,0,0-.423.721Zm2.3,1.756h2.045l.118-.55h-1.3l.117-.515h1.182l.113-.549H238.77l.117-.519h1.265l.117-.516h-2.045l-.549,2.649Zm2.447,0h.692l.4-2.016.49,2.016h1.039l.575-2.649h-.692l-.432,1.9-.46-1.9h-1.064l-.55,2.649Zm2.883,0h.75l.286-.52h1.039l.084.52H246l-.49-2.649h-.922l-1.584,2.649Zm2.015-1.065-.113-1.123-.578,1.123Zm1.241,1.065h.779l.545-2.649h-.75l-.574,2.649Zm-7.949,4.052h.778l.546-2.648h-.75l-.574,2.648Zm1.181,0h2.046l.117-.548h-1.3l.117-.516h1.182l.113-.549h-1.181l.117-.519h1.265l.118-.516h-2.046l-.549,2.648Zm2.447,0H243.9l.113-.574H242.8l.461-2.074h-.775l-.55,2.648ZM284.506,417H279a1.747,1.747,0,0,0-.344-1.76,2.632,2.632,0,0,0-1.985-.632,2.824,2.824,0,0,0-2.751,1.815c-.306,1.457,1.353,1.925,2.728,2.31,3.149.852,7.916,1.183,6.779,6.546-.889,4.181-5.436,6.166-10.029,6.166-4.621,0-8.407-1.353-7.344-6.743h5.5c-.421,1.87.733,2.887,2.713,2.887,1.27,0,3.03-.66,3.31-1.98.572-2.7-3.621-2.117-7.536-4.015-1.82-.881-2.42-2.7-1.966-4.84,1.219-4.7,5.619-6,9.772-6,4.1,0,7.994,1.458,6.652,6.243Zm15.91,14.027H285.289l4.222-19.858h15.127l-.821,3.851H294.19l-.871,4.1h8.856l-.816,3.851H292.5l-.893,4.207h9.625l-.82,3.851Zm3.108,0,4.222-19.858h7.7l3.511,14.8.065-.055,3.134-14.742h4.951l-4.222,19.858h-7.619l-3.506-15.21h-.055l-3.232,15.21Zm26.9,0h-5.5l12.06-19.858h6.71l3.616,19.858h-6.216l-.495-3.879h-8.058l-2.117,3.879Zm4.336-7.729,4.451-8.251h.082l.775,8.251Zm20.141,7.729h-5.5l4.221-19.858h5.5Z"
                                      transform="translate(-95.097 -407.198)"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="container has-text-centered box" style={{maxWidth: '500px'}}>
                    <h1 className="title">Bem-vindo</h1>
                    <h2 className="subtitle">Validação de atividades complementares SESI SENAI </h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit();
                        }}>
                        <div className="field">
                            <h2>Esqueceu sua senha?</h2>
                            <label className="label" htmlFor="email">Insira seu Email</label>
                            <div className="control">
                                <input className="input" name="email" type="email" placeholder="email" required
                                       onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control buttons is-centered">
                                <input className="button is-medium is-fullwidth green" type="submit" value="Entrar"
                                       style={{outline: '0 !important'}}/>
                                {
                                    this.props.loading ?
                                        (<progress class="progress is-small is-primary" max="100"
                                                   style={{marginTop: '-15px'}}></progress>) : ''
                                }
                            </div>
                        </div>
                    </form>
                </div>

                <SignStatus modal={this.state.modal} handleClose={this.handleClose}
                            modalMessage={this.state.modalMessage} modalError={this.state.modalError}/>
            </section>
        );
    }
}

const SignStatus = ({modal, handleClose, modalMessage = 'Teste', modalError}) => (
    <div className={`modal ${modal && 'is-active'}`}>
        <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-content">
            <div className={`notification ${modalError ? 'is-danger' : 'is-success'} is-light`}>
                <button className="delete" onClick={handleClose}></button>
                {modalMessage}
            </div>
        </div>
    </div>
);

export {ForgotPassword} ;
