namespace Services.Helpers.ResponseBuilder;

public interface IJsonResponseModelBuilder<in TModel>
{
    void Model(TModel model);
}