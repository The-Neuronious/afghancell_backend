interface Mapper<E, M> {
  mapModeltoEntity(model: M): E;
}

export default Mapper;
