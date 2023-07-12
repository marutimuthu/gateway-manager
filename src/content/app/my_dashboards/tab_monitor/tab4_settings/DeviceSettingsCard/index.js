// import PageTitle from '../../../../components/PageTitleCard';
// import PageTitleWrapper from '../../../../components/PageTitleWrapperCard';

import { Stack, Button, Grid, Card, CardHeader, CardContent, Divider, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import moment from 'moment';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/Upload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "./App.css";
import { server_url } from 'src/api/app.js';
import { parse } from 'date-fns';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DeviceSettingsCard = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(0);
    const [severity, setSeverity] = useState(0);
    const vertical = 'bottom'
    const horizontal = 'right'
    const openSnackbar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
        // console.log(message,severity)
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function publishAxios(params) {
        openSnackbar("Please Wait", "info");
        axios
            .get(
                // `http://54.202.17.198:8080/api/device/${userInfo.id}`
                `${server_url}/api/device/find/${mac_id[3]}`
            )
            .then((response) => {
                // Seconds

                var post_by
                if (response.data[0].wifi_status == 1 || response.data[0].eth_status == 1) {
                    post_by = "wifi"
                } else {
                    post_by = "lte"
                }

                // if (() - ) < (defaults.http_refresh_interval_mins*60)) {
                if (((parseInt(Math.floor(Date.now() / 1000)) - parseInt(moment.utc(response.data[0].updatedAt).local() / 1000)) < (response.data[0].http_refresh_interval_mins * 60)) == 1) {
                    axios({
                        method: "post",
                        url: `${server_url}/api/device/config/${post_by}`,
                        data: params,
                        headers: { "Content-Type": "application/json" },
                    }).then(res => {
                        // alert(`${res.data.message}`)
                        // console.log(res.data)
                        // console.log(message, severity)
                        // openSnackbar("error", JSON.stringify(res.data.message));
                        openSnackbar(res.data.message, "success");
                       
                        // openSnackbar("error", res.data.message);
                    }).catch((error) => {
                        openSnackbar("Something went wrong..", "error");
                        console.log(error);
                    });
                } else {
                    openSnackbar("Gateway is offline!", "warning");
                }
            })
            .catch((error) => {
                openSnackbar("Something went wrong..", "warning");
                console.log(error);
            });
    }

    const mac_id = location.pathname.split('/')
    // console.log(mac_id[3])

    const [device, setDevice] = useState([]);
    const [defaults, setDefaults] = useState({});
    const [inputs, setInputs] = useState({});
    const [network, setNetwork] = useState({});
    // const [routes, setRoutes] = useState({});
    // const [modbus, setModbus] = useState({});
    const network_modeRef = useRef();
    const wifi_ssidRef = useRef();
    const wifi_passRef = useRef();
    const dhcpRef = useRef();
    const ipRef = useRef();
    const gatewayRef = useRef();
    const subnetRef = useRef();
    const dns1Ref = useRef();
    const dns2Ref = useRef();
    const lte_modeRef = useRef();
    const lte_apnRef = useRef();

    const mqtt_wifi_urlRef = useRef();
    const mqtt_wifi_userRef = useRef();
    const mqtt_wifi_passRef = useRef();
    const mqtt_lte_urlRef = useRef();
    const mqtt_lte_userRef = useRef();
    const mqtt_lte_passRef = useRef();

    const mb_modeRef = useRef();
    const mb_intervalRef = useRef();
    const mb_timeoutRef = useRef();
    const mb_offsetRef = useRef();
    const baudRef = useRef();
    const data_bitsRef = useRef();
    const parityRef = useRef();
    const stop_bitsRef = useRef();
    const mb_ipRef = useRef();
    const mb_portRef = useRef();
    const mb_queryRef = useRef();
    // const Ref = useRef();

    const schedule_restart_enableRef = useRef();
    const schedule_restart_hourRef = useRef();
    const schedule_restart_minuteRef = useRef();
    const schedule_restart_secondRef = useRef();


    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs);
    }

    const handleSubmitNetwork = (event) => {

        const publish = {
            "action": "network",
            "mac_id": mac_id[3],
            "network_mode": `${network_modeRef.current.value}`,
            "wifi_ssid": `${wifi_ssidRef.current.value}`,
            "wifi_pass": `${wifi_passRef.current.value}`,
            "dhcp": `${dhcpRef.current.value}`,
            "ip": `${ipRef.current.value}`,
            "gateway": `${gatewayRef.current.value}`,
            "subnet": `${subnetRef.current.value}`,
            "dns1": `${dns1Ref.current.value}`,
            "dns2": `${dns2Ref.current.value}`,
            "lte_mode": `${lte_modeRef.current.value}`,
            "lte_apn": `${lte_apnRef.current.value}`,
        }

        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitRoutes = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "mqtt",
            "mqtt_wifi_url": `${mqtt_wifi_urlRef.current.value}`,
            "mqtt_wifi_user": `${mqtt_wifi_userRef.current.value}`,
            "mqtt_wifi_pass": `${mqtt_wifi_passRef.current.value}`,
            "mqtt_lte_url": `${mqtt_lte_urlRef.current.value}`,
            "mqtt_lte_user": `${mqtt_lte_userRef.current.value}`,
            "mqtt_lte_pass": `${mqtt_lte_passRef.current.value}`
        }
        // console.log(publish);
        publishAxios(publish);

    }

    // const handleChangeModbus = (event) => {
    //     event.preventDefault();
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setModbus(values => ({ ...values, [name]: value }))
    // }

    const handleSubmitModbusConfig = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "modbus",
            "mb_mode": `${mb_modeRef.current.value}`,
            "mb_interval": `${mb_intervalRef.current.value}`,
            "mb_timeout": `${mb_timeoutRef.current.value}`,
            "mb_offset": `${parseInt(mb_offsetRef.current.value)}`,
            "baud": `${baudRef.current.value}`,
            "data_bits": `${data_bitsRef.current.value}`,
            "parity": `${parityRef.current.value}`,
            "stop_bits": `${stop_bitsRef.current.value}`,
            "mb_ip": `${mb_ipRef.current.value}`,
            "mb_port": `${mb_portRef.current.value}`
        }
        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitModbusQuery = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "modbus",
            "query": `${mb_queryRef.current.value}`
        }
        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitEraseModbusQuery = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "modbus",
            "cmd": "erase_queries"
        }
        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitReboot = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "modbus",
            "cmd": "reboot"
        }
        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitSystem = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "schedule_restart",
            "schedule_restart_enable": `${schedule_restart_enableRef.current.value}`,
            "schedule_restart_hour": `${schedule_restart_hourRef.current.value}`,
            "schedule_restart_minute": `${schedule_restart_minuteRef.current.value}`,
            "schedule_restart_second": `${schedule_restart_secondRef.current.value}`
        }
        // console.log(publish);
        publishAxios(publish);
    }

    const handleSubmitFormat = (event) => {
        const publish = {
            "mac_id": mac_id[3],
            "action": "modbus",
            "cmd": "reboot"
        }
        // console.log(publish);
        publishAxios(publish);
    }

    useEffect(() => {
        axios
            .get(
                // `http://54.202.17.198:8080/api/device/${userInfo.id}`
                `${server_url}/api/device/find/${mac_id[3]}`
            )
            .then((response) => {
                // console.log('DEBUG zone response', response.data[0]);
                // console.log(response.data[0].http_refresh_interval_mins);
                setDevice(response.data[0]);
                setDefaults(response.data[0]);
                setTimeout(() => {
                    setDefaults({});
                }, 200);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <Grid >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Card>
                {/* <PageTitleWrapper>
                    <PageTitle
                        heading="Firmware"
                        subHeading=""
                        docs="Add/" />
                </PageTitleWrapper> */}
                <Divider />
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 'auto' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                color='primary'
                            >
                                <Typography variant="h3" gutterBottom>
                                    Device
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    General
                                </Typography>

                                <TextField
                                    // disabled
                                    // required
                                    // helperText={device.name}
                                    // defaultValue={"Zone Name"}
                                    id="outlined-required"
                                    label="Zone Name"
                                    defaultValue="No value"
                                    name='name'
                                    value={inputs.name || defaults.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    // disabled
                                    // required
                                    id="outlined-required"
                                    label="Modules"
                                    defaultValue="No value"
                                    name='modules'
                                    value={inputs.modules || defaults.modules}
                                    onChange={handleChange}
                                />
                                <TextField
                                    // disabled
                                    // required
                                    id="outlined-required"
                                    label="Process"
                                    defaultValue="No value"
                                    name='process'
                                    value={inputs.process || defaults.process}
                                    onChange={handleChange}
                                />
                                <TextField
                                    // disabled
                                    // required
                                    label="Location"
                                    id="outlined-required"
                                    defaultValue="Mumbai, India"
                                    name='location'
                                    value={inputs.location || defaults.location}
                                    onChange={handleChange}
                                />
                                <Grid container justifyContent="" alignItems="">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                        onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                color='primary'
                            >
                                <Typography variant="h3" gutterBottom>
                                    Network
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    Selection
                                </Typography>

                                {/* <TextField
                                    id="outlined-required"
                                    select
                                    label="Network"
                                    value={inputs.network_mode || defaults.network_mode}
                                    onChange={handleChange}
                                    helperText="Network Priority"
                                >

                                </TextField> */}
                                <TextField
                                    // disabled
                                    // required
                                    inputRef={network_modeRef}
                                    id="outlined-required"
                                    label="Network Mode"
                                    defaultValue="Mode"
                                    // value={inputs.wifi_ssid || defaults.wifi_ssid}
                                    name='network_mode'
                                    value={defaults.network_mode}
                                    helperText="0 - Disable | 1 - Wifi | 2 - Ethernet"

                                />
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    Wifi
                                </Typography>
                                <TextField
                                    // disabled
                                    // required
                                    id="outlined-required"
                                    label="SSID"
                                    defaultValue="SSID"
                                    // value={inputs.wifi_ssid || defaults.wifi_ssid}
                                    name='wifi_ssid'
                                    value={defaults.wifi_ssid}
                                    inputRef={wifi_ssidRef}

                                />
                                <TextField
                                    // disabled

                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    defaultValue="Password"
                                    // autoComplete="current-password"
                                    value={defaults.wifi_pass}
                                    name='wifi_pass'
                                    inputRef={wifi_passRef}
                                />

                                <div>
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        Static IP
                                    </Typography>

                                    {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Enable"
                                        value="true"
                                        onChange={handleChange}
                                    >
                                        {enable.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                    <TextField
                                        // disabled
                                        inputRef={dhcpRef}
                                        id="outlined-required"
                                        label="DHCP"
                                        defaultValue="DHCP"
                                        name='dhcp'
                                        value={defaults.dhcp}
                                        helperText="0 - Static | 1 - Dynamic"

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={ipRef}
                                        id="outlined-required"
                                        label="IP Address"
                                        defaultValue="192.168.29.100"
                                        name='ip'
                                        value={defaults.ip}

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={gatewayRef}
                                        id="outlined-required"
                                        label="Gateway"
                                        defaultValue="192.168.29.1"
                                        name='gateway'
                                        value={defaults.gateway}

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={subnetRef}
                                        id="outlined-required"
                                        label="Subnet"
                                        defaultValue="255.255.255.0"
                                        name='subnet'
                                        value={defaults.subnet}

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={dns1Ref}
                                        id="outlined"
                                        label="DNS 1"
                                        defaultValue="8.8.8.8"
                                        name='dns1'
                                        value={defaults.dns1}

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={dns2Ref}
                                        id="outlined-required"
                                        label="DNS 2"
                                        defaultValue="8.8.2.2"
                                        name='dns2'

                                        value={defaults.dns2}
                                    />
                                </div>

                                <div>
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        4G LTE
                                    </Typography>

                                    {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Enable"
                                        value="true"
                                        onChange={handleChange}
                                    >
                                        {enable.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                    <TextField
                                        // disabled
                                        inputRef={lte_modeRef}
                                        id="outlined-required"
                                        label="Enable"
                                        defaultValue="0"
                                        name='lte_mode'
                                        value={defaults.lte_mode}
                                        helperText="0 - Disable | 1 - Enable"

                                    />
                                    <TextField
                                        // disabled
                                        inputRef={lte_apnRef}
                                        id="outlined-required"
                                        label="Set APN"
                                        defaultValue="m2misafe"
                                        name='lte_apn'
                                        value={defaults.lte_apn}

                                    />
                                </div>

                                <Grid container justifyContent="" alignItems="">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                        onClick={handleSubmitNetwork}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" gutterBottom>
                                    Data Routes
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        MQTT Broker - Wifi
                                    </Typography>
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="MQTT Broker"
                                        defaultValue="mqtt://test.com:1883/"
                                        name='mqtt_wifi_url'
                                        value={defaults.mqtt_wifi_url}
                                        inputRef={mqtt_wifi_urlRef}
                                    />
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Username"
                                        defaultValue="MQTT User"
                                        name='mqtt_wifi_user'
                                        value={defaults.mqtt_wifi_user}
                                        inputRef={mqtt_wifi_userRef}
                                    />
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Password"
                                        defaultValue="MQTT Password"
                                        name='mqtt_wifi_pass'
                                        value={defaults.mqtt_wifi_pass}
                                        inputRef={mqtt_wifi_passRef}
                                    />
                                </div>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    MQTT Broker - 4G LTE
                                </Typography>
                                <TextField
                                    // disabled
                                    id="outlined-required"
                                    label="MQTT Broker"
                                    defaultValue="mqtt://test.com:1883/"
                                    value={defaults.mqtt_lte_url}
                                    inputRef={mqtt_lte_urlRef}
                                />
                                <TextField
                                    // disabled
                                    id="outlined-required"
                                    label="Username"
                                    defaultValue="MQTT User"
                                    value={defaults.mqtt_lte_user}
                                    inputRef={mqtt_lte_userRef}
                                />
                                <TextField
                                    // disabled
                                    id="outlined-required"
                                    label="Password"
                                    defaultValue="MQTT Password"
                                    value={defaults.mqtt_lte_pass}
                                    inputRef={mqtt_lte_passRef}
                                />
                                <Typography sx={{ p: 1 }} variant="h5" component="h5" gutterBottom>
                                    API endpoint - Development
                                </Typography>
                                <TextField
                                    // disabled
                                    id="outlined-required"
                                    label="API Endpoint"
                                    defaultValue="Hello World"
                                />
                                <Grid container justifyContent="" alignItems="">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                        onClick={handleSubmitRoutes}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" gutterBottom>
                                    Modbus Settings
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        Modbus Mode
                                    </Typography>
                                    <TextField
                                        inputRef={mb_modeRef}
                                        name='mb_mode'
                                        value={defaults.mb_mode}
                                        id="outlined-required"
                                        label="Modbus Mode"
                                        defaultValue="Mode"
                                        helperText="0 - Disable | 1 - RTU | 2 - ASCII | 3 - TCPIP"
                                    />
                                    <TextField
                                        inputRef={mb_intervalRef}
                                        name='mb_interval'
                                        value={defaults.mb_interval}
                                        id="outlined-required"
                                        label="Scan Interval"
                                        defaultValue="50"
                                        helperText="milliseconds"
                                    />
                                    <TextField
                                        inputRef={mb_timeoutRef}
                                        name='mb_timeout'
                                        value={defaults.mb_timeout}
                                        id="outlined-required"
                                        label="Scan Timeout"
                                        defaultValue="50"
                                        helperText="milliseconds"
                                    />
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        MODBUS RTU / ASCII
                                    </Typography>
                                    {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Enable"
                                        value="false"
                                        onChange={handleChange}
                                    >
                                        {enable.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}

                                    <TextField
                                        inputRef={baudRef}
                                        id="outlined-required"
                                        label="Baud Rate"
                                        defaultValue="Baud Rate"
                                        name='baud'
                                        value={defaults.baud}
                                        helperText="4800 / 9600 / 115200"
                                    />

                                    <TextField
                                        inputRef={data_bitsRef}
                                        id="outlined-required"
                                        label="Data Bits"
                                        defaultValue="Data Bits"
                                        name='data_bits'
                                        value={defaults.data_bits}
                                        helperText="8"
                                    />

                                    <TextField
                                        inputRef={parityRef}
                                        id="outlined-required"
                                        label="Parity"
                                        defaultValue="Parity"
                                        name='parity'
                                        value={defaults.parity}
                                        helperText="EVEN, ODD, DISABLE"
                                    />

                                    <TextField
                                        inputRef={stop_bitsRef}
                                        id="outlined-required"
                                        label="Stop Bits"
                                        defaultValue="Stop Bits"
                                        name='stop_bits'
                                        value={defaults.stop_bits}
                                        helperText="1, 1_5, 2"
                                    />

                                    {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Baud Rate"
                                        value="9600"
                                        onChange={handleChange}
                                    >
                                        {baudrate.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                    {/* <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Data Format"
                                        value="8N1"
                                        onChange={handleChange}
                                        helperText="Start Bits, Parity, Stop Bits"
                                    >
                                        {dataformat.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField> */}
                                </div>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    Modbus TCP
                                </Typography>
                                {/* <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Enable"
                                    value="false"
                                    onChange={handleChange}
                                    helperText="Network Priority"
                                >
                                    {enable.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField> */}
                                <TextField
                                    inputRef={mb_ipRef}
                                    name='mb_ip'
                                    value={defaults.mb_ip}
                                    id="outlined-required"
                                    label="IP Address"
                                    defaultValue="192.168.29.100"
                                />
                                <TextField
                                    inputRef={mb_portRef}
                                    name='mb_port'
                                    value={defaults.mb_port}
                                    id="outlined-required"
                                    label="Port"
                                    defaultValue="502"
                                />

                                <Grid container justifyContent="" alignItems="">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                        onClick={handleSubmitModbusConfig}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    Modbus Query
                                </Typography>

                                <div id="config_modbus" >
                                    <TextField
                                        inputRef={mb_queryRef}
                                        name='mb_query'
                                        value={defaults.mb_query}
                                        id="outlined-required"
                                        label="Modbus Query"
                                        defaultValue="[1,3,0,6,0,0]"
                                        helperText="[<slaveid>,<function_code>,<address>,<no_of_registers>,<data_type>,<index>]"
                                    />
                                    <Grid container justifyContent="" alignItems="left">
                                        <Button
                                            sx={{ m: { xs: 1, md: 1 } }}
                                            variant="contained"
                                            component="label"
                                            startIcon={<SendIcon fontSize="small" />}
                                            onClick={handleSubmitModbusQuery}
                                        >
                                            Add Query
                                        </Button>
                                        <Button
                                            sx={{ m: { xs: 1, md: 1 } }}
                                            variant="contained"
                                            component="label"
                                            startIcon={<DeleteIcon fontSize="small" />}
                                            onClick={handleSubmitEraseModbusQuery}
                                        >
                                            Erase All Queries
                                        </Button>
                                    </Grid>

                                </div>
                                {/* <Grid container justifyContent="" alignItems="">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                    // onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid> */}
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" gutterBottom>
                                    System
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                        Scheduled Restart
                                    </Typography>
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Mode"
                                        defaultValue="1"
                                        name='schedule_restart_enable'
                                        value={defaults.schedule_restart_enable}
                                        inputRef={schedule_restart_enableRef}
                                        helperText="0 - Disable | 1 - Enable"
                                    />
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Hour"
                                        defaultValue="10,29,30"
                                        name='schedule_restart_hour'
                                        value={defaults.schedule_restart_hour}
                                        inputRef={schedule_restart_hourRef}
                                        helperText="Range: 0 to 23"
                                    />
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Minutes"
                                        defaultValue="10,29,30"
                                        name='schedule_restart_minute'
                                        value={defaults.schedule_restart_minute}
                                        inputRef={schedule_restart_minuteRef}
                                        helperText="Range: 0 to 60"
                                    />
                                    <TextField
                                        // disabled
                                        id="outlined-required"
                                        label="Minutes"
                                        defaultValue="10,29,30"
                                        name='schedule_restart_second'
                                        value={defaults.schedule_restart_second}
                                        inputRef={schedule_restart_secondRef}
                                        helperText="Range: 0 to 60"
                                    />
                                    <Grid container justifyContent="" alignItems="">
                                        <Button
                                            sx={{ m: { xs: 1, md: 1 } }}
                                            variant="contained"
                                            component="label"
                                            startIcon={<UploadIcon fontSize="small" />}
                                            onClick={handleSubmitSystem}
                                        >
                                            Save Changes
                                        </Button>
                                    </Grid>

                                </div>
                                <Typography sx={{ p: 1 }} variant="h5" gutterBottom>
                                    Commands
                                </Typography>

                                <Grid container justifyContent="" alignItems="left">
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<UploadIcon fontSize="small" />}
                                        onClick={handleSubmitFormat}
                                    >
                                        Format Memory
                                    </Button>
                                    <Button
                                        sx={{ m: { xs: 1, md: 1 } }}
                                        variant="contained"
                                        component="label"
                                        startIcon={<RestartAltIcon fontSize="small" />}
                                        onClick={handleSubmitReboot}
                                    >
                                        Reboot Gateway
                                    </Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default DeviceSettingsCard;