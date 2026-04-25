const EmptyState = ({ message = "No items found", subMessage, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon className="text-6xl text-gray-300 mb-4" />}
      <h3 className="text-xl font-medium text-text mb-2">{message}</h3>
      {subMessage && <p className="text-text-light">{subMessage}</p>}
    </div>
  );
};

export default EmptyState;
