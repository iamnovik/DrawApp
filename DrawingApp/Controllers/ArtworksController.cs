using DrawingApp.Models.Responses;
using DrawingApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DrawingApp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ArtworksController(IArtworksService artworksService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> SaveImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("No image uploaded");
        var saveDto = await artworksService.SaveImage(image);
        var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{saveDto.FileName}";
        return Ok(new SaveAtrworkResponse(){ FileUrl = fileUrl, FileArtwork =  saveDto.ImageFile});
    }
    
    
    
}