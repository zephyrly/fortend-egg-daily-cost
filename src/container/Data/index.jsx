import { useState, useReducer, useRef } from 'react';
import { Popup, Cell, Button, Picker, Toast, Modal, Loading } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

const initVisibleState = {
  popBottom: false,
  popTop: false,
  popLeft: false,
  popRight: false,
  picker: false,
  popSpec: false,
  popCenterSpec: false,
};

const Demo = () => {
  const popupRef = useRef();
  const [value, setValue] = useState('');
  const [visible, setVisible] = useReducer((state, action) => {
    const { type } = action;
    return {
      ...state,
      [type]: !state[type],
    };
  }, initVisibleState);

  const toggle = (type) => setVisible({ type });

  return (
    <>
      <Cell
        description={
          <Button size="xs" onClick={() => {
            toggle('popTop');

            setTimeout(() => {
              toggle('popTop');
            }, 3000);
          }}>开启</Button>
        }
      >
        从上方弹出
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => toggle('popBottom')}>开启</Button>
        }
      >
        从下方弹出
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => toggle('popLeft')}>开启</Button>
        }
      >
        从左侧弹出
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => toggle('popRight')}>开启</Button>
        }
      >
        从右侧弹出
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => toggle('popCenter')}>开启</Button>
        }
      >
        从中间弹出
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => toggle('popSpec')}>开启</Button>
        }
      >
        自定义挂载节点
      </Cell>

      <Popup
        visible={visible.popTop}
        direction="top"
        mask={false}
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-top">
          更新成功
        </div>
      </Popup>

      <Popup
        visible={visible.popBottom}
        direction="bottom"
        onMaskClick={() => toggle('popBottom')}
        afterOpen={() => console.log('打开')}
        afterClose={() => console.log('关闭')}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('picker')}>打开Picker</Button>
        </div>
      </Popup>

      <Picker
        visible={visible.picker}
        value={value}
        dataSource={SINGLE_DATA}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue(selected.map(item => item.value));
          toggle('picker');
        }}
        onCancel={() => toggle('picker')}
      />

      <Popup
        visible={visible.popLeft}
        onMaskClick={() => toggle('popLeft')}
        direction="left"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-left">
          <Button size="xs" onClick={() => toggle('popLeft')}>关闭弹层</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popRight}
        onMaskClick={() => toggle('popRight')}
        direction="right"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-right">
          <Button size="xs" onClick={() => toggle('popRight')}>关闭弹层</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popCenter}
        direction="center"
        width="70%"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('popCenter')}>关闭弹层</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popCenterSpec}
        direction="center"
        width="70%"
        afterClose={() => console.log('关闭')}
        onEsc={() => { toggle('popCenterSpec')}}
        mountContainer={() => {
          return popupRef.current.portalRef.popup
        }}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('popCenterSpec')}>关闭弹层</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popSpec}
        onMaskClick={() => {
          if(visible.popCenterSpec) {
            toggle('popCenterSpec');
          }
          toggle('popSpec');
        }}
        afterClose={() => console.log('关闭')}
        onEsc={() => { toggle('popSpec')}}
        ref={popupRef}
        destroy={true}
      >
        <div className="popup-box-bottom">
          <Button size="xs" onClick={() => toggle('popCenterSpec')}>打开弹层</Button>
          <p>打开的modal挂载此popup上</p>
        </div>
      </Popup>
    </>
  );
}


export default Demo