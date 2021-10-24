import Button from '@mui/material/Button';

export default function FloatingBox(props) {

    return <><div className="fixed" style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
        {props.icon ?
            <>{props.icon}</>
            : <></>}
    </div><div className="fixed" onClick={props.action} style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
           {props.children}
        </div>
        <div className="fixed" onClick={props.action} style={{ zindex: 10, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
            <Button variant="outlined" style={{ minHeight: "100%", minWidth: "100%"}}>
                {props.buttonChildren}
            </Button>
        </div></>
}
