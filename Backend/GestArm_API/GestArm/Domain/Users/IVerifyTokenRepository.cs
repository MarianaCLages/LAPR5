using Google.Apis.Auth;

namespace GestArm.Domain.Users;

public interface IVerifyTokenRepository
{
   
    Task<GoogleJsonWebSignature.Payload> GetPayloadFromGoogle(string token);

}