interface UseCase<T, P> {
    call(params: P): Promise<T>;
}

export default UseCase;