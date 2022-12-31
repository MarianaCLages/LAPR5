using GestArm.Domain.Users;
using GestArm.Infrastructure.Shared;
using Google.Apis.Auth;

namespace GestArm.Infrastructure.Users;

public class VerifyTokenRepository : IVerifyTokenRepository
{

     private IConfiguration Configuration { get; }

    public VerifyTokenRepository( IConfiguration configuration) 
    {
       Configuration = configuration;
    }
    
    public async Task<GoogleJsonWebSignature.Payload> GetPayloadFromGoogle(string token)
    {
         try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { Configuration.GetConnectionString("Client_ID") }
            };

           return await GoogleJsonWebSignature.ValidateAsync(token, settings);

        }
        catch (Exception)
        {
           return null;
        }
    }
    
}