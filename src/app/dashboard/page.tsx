"use client";

import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { widgets } from '@/components/widgets';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage = () => {
  const [layout, setLayout] = useState([
    { i: 'generate', x: 0, y: 0, w: 6, h: 4 },
    { i: 'chatbot', x: 6, y: 0, w: 6, h: 4 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const handleSaveLayout = () => {
    console.log('Saving layout:', layout);
    // Here you would save the layout to Firestore
  };

  const handleAddWidget = (widgetId: string) => {
    const newLayoutItem = { i: widgetId, x: 0, y: Infinity, w: 6, h: 4 };
    setLayout([...layout, newLayoutItem]);
    setIsModalOpen(false);
  };

  const renderWidgets = () => {
    return layout.map((item) => {
      const widget = widgets.find((w) => w.id === item.i);
      if (!widget) return null;

      const Component = widget.component;

      return (
        <div key={item.i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-auto">
          <Component />
        </div>
      );
    });
  };

  return (
    <div className="w-[100vw] ml-[4.2em] pr-2  md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-5 mt-2 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-600 text-center">
          Customizable Dashboard
        </h2>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2">
            Add Widget
          </button>
          <button onClick={handleSaveLayout} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Save Layout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Add a Widget</h3>
            <ul>
              {widgets.map((widget) => (
                <li key={widget.id} onClick={() => handleAddWidget(widget.id)} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
                  {widget.name}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
      >
        {renderWidgets()}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DashboardPage;
