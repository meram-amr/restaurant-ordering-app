function MenuCard({ item }) {
  return (
    <article className="w-full">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pt-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-[18px] leading-[1.2] text-[#25251f]">
            {item.name}
          </h3>
          <span className="whitespace-nowrap text-[10px] font-bold text-[#25251f]">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-[10px] leading-[1.35] text-[#77766f]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default MenuCard;