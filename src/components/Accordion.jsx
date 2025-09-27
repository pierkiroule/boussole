import React, { useState } from 'react';

export default function Accordion({ defaultOpenId = 'N', children }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  const items = React.Children.toArray(children).map((child) => {
    if (!React.isValidElement(child)) return child;
    const id = child.props.id;
    const isOpen = openId === id;
    return React.cloneElement(child, {
      isOpen,
      onToggle: () => setOpenId(isOpen ? null : id),
    });
  });

  return <div className="space-y-3">{items}</div>;
}

