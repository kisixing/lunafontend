import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { getThemeColor, changeAntdTheme, placementSketchPicker } from './util';


interface IProps {
    primaryColor: string,
    storageName: string,
    style: React.CSSProperties,
    placement: any,
    themeChangeCallback: any
}

const DynamicAntdTheme = (props: IProps) => {

    const {
        primaryColor = '#1890ff',
        storageName = 'custom-antd-primary-color',
        style = { display: 'inline-block' },
        placement = null,
        themeChangeCallback = null
    } = props

    const [color, setColor] = useState(tinycolor(primaryColor).toRgb())
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    useEffect(() => {
        const storageColor = window.localStorage.getItem(storageName);
        if (storageColor) {
            changeAntdTheme(getThemeColor(storageColor));
            document.getElementById('change_antd_theme_color').style.backgroundColor = storageColor;
            if (themeChangeCallback) {
                themeChangeCallback(storageColor);
            }
        }
    }, [])

    useEffect(() => {
        changeAntdTheme(getThemeColor(color.hex));
        window.localStorage.setItem(storageName, color.hex);
        console.log('color',color)
        themeChangeCallback && themeChangeCallback(color.hex);
    }, [color])

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);

    };

    const handleChange = color => {
        console.log('set',color)
        setColor(color.rgb);
    };

    const styles: { [x: string]: React.CSSProperties } = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        },
        swatch: {
            width: '46px',
            maxWidth: '46px',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
        },
        popover: {
            position: 'absolute',
            zIndex: 99999,
            ...placementSketchPicker(placement)
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        }
    };

    return (
        <div style={style}>
            <div id='change_antd_theme_button' style={styles.swatch} onClick={handleClick}>
                <div id='change_antd_theme_color' style={styles.color} />
            </div>
            {
                displayColorPicker
                    ? <div style={styles.popover}>
                        <div style={styles.cover} onClick={handleClose} />
                        <SketchPicker
                            color={color}
                            onChange={handleChange}
                        />
                    </div> : null
            }
        </div>
    );
}

export { DynamicAntdTheme , getThemeColor, changeAntdTheme }