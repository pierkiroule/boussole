import React, { useRef, useState } from 'react';

export default function Accordion({ defaultOpenId = 'N', openId: controlledOpenId, onOpenIdChange, children }) {
  const [uncontrolledOpenId, setUncontrolledOpenId] = useState(defaultOpenId);
  const headerRefs = useRef([]);

  const childArray = React.Children.toArray(children);

  const getHeaderId = (id) => `accordion-header-${id}`;
  const getPanelId = (id) => `accordion-panel-${id}`;

  const isControlled = controlledOpenId !== undefined;
  const openId = isControlled ? controlledOpenId : uncontrolledOpenId;

  const setOpenId = (next) => {
    if (isControlled) {
      onOpenIdChange?.(next);
    } else {
      setUncontrolledOpenId(next);
    }
  };

  const focusHeaderAt = (index) => {
    const ref = headerRefs.current[index];
    if (ref && typeof ref.focus === 'function') ref.focus();
  };

  const onHeaderKeyDown = (event, index) => {
    const key = event.key;
    const len = childArray.length;
    if (!len) return;
    if (key === 'ArrowDown') {
      event.preventDefault();
      focusHeaderAt((index + 1) % len);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      focusHeaderAt((index - 1 + len) % len);
    } else if (key === 'Home') {
      event.preventDefault();
      focusHeaderAt(0);
    } else if (key === 'End') {
      event.preventDefault();
      focusHeaderAt(len - 1);
    }
  };

  const items = childArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    const id = child.props.id;
    const isOpen = openId === id;
    return React.cloneElement(child, {
      isOpen,
      onToggle: () => setOpenId(isOpen ? null : id),
      headerId: getHeaderId(id),
      panelId: getPanelId(id),
      headerRef: (el) => { headerRefs.current[index] = el; },
      onHeaderKeyDown: (e) => onHeaderKeyDown(e, index),
    });
  });

  return <div className="space-y-3">{items}</div>;
}

